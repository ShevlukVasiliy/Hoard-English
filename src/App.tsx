import { useCallback, useEffect, useRef, useState } from "react";
import { getLesson } from "../shared/lessons";
import { dueReviews } from "../shared/progress";
import { withReminderHint } from "../shared/stats";
import type { AnkiCache, AnkiQueueItem, HighlightsFile, Progress, Settings } from "../shared/types";
import { DEFAULT_SETTINGS, EMPTY_PROGRESS, NOTES_DECK, STORIES_DECK } from "../shared/types";
import { BlitzScreen } from "./BlitzScreen";
import { FinalScreen } from "./FinalScreen";
import { useHistory } from "./history";
import { ShortcutsHelp, SwipeNav, useShortcuts } from "./Navigation";
import { NotesScreen } from "./NotesScreen";
import { OnboardingScreen } from "./OnboardingScreen";
import { StoriesScreen, StoryScreen } from "./StoriesScreen";
import { Home } from "./Home";
import { LessonScreen } from "./LessonScreen";
import { MapScreen } from "./MapScreen";
import { ReviewScreen } from "./ReviewScreen";
import { installSelectionPaint } from "./selection";
import { SettingsScreen } from "./SettingsScreen";
import { Ctx, type AppState, type Route } from "./state";
import { EMPTY_ANKI, inTauri, loadAnki, loadHighlights, loadProgress, loadSettings, saveAnki, saveHighlights, saveProgress, saveSettings } from "./storage";
import { addToAnki, syncAutostart } from "./system";
import { TestScreen } from "./TestScreen";
import { WordsScreen } from "./WordsScreen";

// Вкладки; sub — экраны внутри вкладки, при которых она подсвечена.
export const TABS: { route: Route; label: string; sub: Route["name"][] }[] = [
  { route: { name: "home" }, label: "Главная", sub: ["review", "test", "blitz"] },
  { route: { name: "map" }, label: "Уроки", sub: ["lesson", "final"] },
  { route: { name: "stories" }, label: "История", sub: ["story"] },
  { route: { name: "notes" }, label: "Заметки", sub: [] },
  { route: { name: "words" }, label: "Слова", sub: [] },
];

// В браузерном режиме стартовый экран можно задать в адресе JSON-ом: #{"name":"map"}.
function devRoute(): Route | undefined {
  if (inTauri || !location.hash) return;
  try { return JSON.parse(decodeURIComponent(location.hash.slice(1))) as Route; } catch { return undefined; }
}

// Экраны, которым нужна ширина под поля.
const WIDE = new Set<Route["name"]>(["lesson"]);

export function App() {
  const [progress, setProgressState] = useState<Progress>(EMPTY_PROGRESS);
  const [settings, setSettingsState] = useState<Settings>(DEFAULT_SETTINGS);
  const [anki, setAnkiState] = useState<AnkiCache>(EMPTY_ANKI);
  const [highlights, setHighlightsState] = useState<HighlightsFile>({ items: [] });
  const [toastText, setToastText] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const nav = useHistory(devRoute() ?? { name: "home" });
  const route = nav.route;
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const guard = useRef<string | null>(null);
  const [pending, setPending] = useState<{ message: string; run: () => void } | null>(null);
  const [help, setHelp] = useState(false);
  const setLeaveGuard = useCallback((m: string | null) => { guard.current = m; }, []);

  useEffect(() => {
    Promise.all([loadProgress(), loadSettings(), loadAnki(), loadHighlights()])
      .then(([p, s, a, h]) => {
        setProgressState(p);
        setSettingsState(s);
        setAnkiState(a);
        setHighlightsState(h);
        if (!s.onboarded && !devRoute()) nav.go({ name: "onboarding" });
        // автозапуск включается по настройке при первом запуске и не расходится с системой
        syncAutostart(s.autostart).catch(() => {});
      })
      .catch((e) => setError(`Не удалось прочитать данные: ${e}`))
      .finally(() => setReady(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(installSelectionPaint, []);
  useEffect(() => { if (inTauri) document.documentElement.classList.add("in-tauri"); }, []);

  useEffect(() => {
    if (settings.theme === "system") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  // уход с экрана, который попросил подтверждение, — через плашку
  const guarded = (run: () => void) => () => {
    if (guard.current) setPending({ message: guard.current, run: () => { guard.current = null; setPending(null); run(); } });
    else run();
  };

  const fail = (what: string) => (e: unknown) => setError(`${what} не сохранён: ${e}`);

  const toast = (message: string) => {
    clearTimeout(toastTimer.current);
    setToastText(message);
    toastTimer.current = setTimeout(() => setToastText(null), 3200);
  };

  // Отправка в Anki: дубликат считается доставленным, недоступный Anki — очередь.
  const send = async (item: AnkiQueueItem): Promise<"sent" | "queued"> => {
    try {
      await addToAnki(item.deck ?? settings.ankiDeck, item);
      return "sent";
    } catch (e) {
      if (String(e).includes("duplicate")) return "sent";
      setAnkiState((a) => { const next = { ...a, queue: [...a.queue, item] }; saveAnki(next).catch(fail("Кэш Anki")); return next; });
      return "queued";
    }
  };

  const markSent = (ids: string[], at: string) => setHighlightsState((h) => {
    const next = { items: h.items.map((x) => (ids.includes(x.id) ? { ...x, ankiAt: at } : x)) };
    saveHighlights(next).catch(fail("Заметки"));
    return next;
  });
  const stateRef = useRef<AppState>(null!);
  const state: AppState = {
    progress, settings, anki,
    setProgress: (raw: Progress) => { const p = withReminderHint(raw); setProgressState(p); saveProgress(p).catch(fail("Прогресс")); },
    setSettings: (s: Settings) => { setSettingsState(s); saveSettings(s).catch(fail("Настройки")); },
    setAnki: (a: AnkiCache) => { setAnkiState(a); saveAnki(a).catch(fail("Кэш Anki")); },
    highlights,
    setHighlights: (h: HighlightsFile) => { setHighlightsState(h); saveHighlights(h).catch(fail("Заметки")); },
    sendNoteToAnki: async (h) => {
      const lesson = getLesson(h.lessonId);
      const now = new Date().toISOString();
      const r = await send({ front: h.text, back: lesson ? `Урок «${lesson.title}» — ${lesson.subtitle}` : "Hoard", source: "note", addedAt: now, deck: NOTES_DECK });
      markSent([h.id], now);
      toast(r === "sent" ? `Отправлено в Anki, колода ${NOTES_DECK}` : "Anki закрыт — заметка в очереди и добавится позже");
    },
    sendStoriesToAnki: async (lessons) => {
      const now = new Date().toISOString();
      let sent = 0, queued = 0;
      for (const l of lessons) {
        if (!l.story) continue;
        const r = await send({ front: l.story.question, back: `${l.story.takeaway ?? l.story.title}\n\n«${l.story.title}», урок «${l.title}»`, source: "story", addedAt: now, deck: STORIES_DECK });
        if (r === "sent") sent++; else queued++;
      }
      setProgressState((p) => {
        const next = withReminderHint({ ...p, storiesInAnki: [...new Set([...(p.storiesInAnki ?? []), ...lessons.map((l) => l.id)])] });
        saveProgress(next).catch(fail("Прогресс"));
        return next;
      });
      toast(queued ? `Отправлено: ${sent}. Anki закрыт — ещё ${queued} в очереди` : `Отправлено в Anki: ${sent}, колода ${STORIES_DECK}`);
    },
    toast,
    go: (r: Route) => guarded(() => nav.go(r))(),
    back: guarded(nav.back),
    forward: guarded(nav.forward),
    setLeaveGuard,
  };
  stateRef.current = state;

  useShortcuts({
    back: state.back,
    forward: state.forward,
    tab: (i) => { const t = TABS[i]; if (t) state.go(t.route); },
    settings: () => state.go({ name: "settings" }),
    help: () => setHelp((h) => !h),
  });

  // пункты меню macOS «Перейти» (src-tauri/src/lib.rs)
  useEffect(() => {
    if (!inTauri) return;
    let off: (() => void) | undefined;
    import("@tauri-apps/api/event").then(({ listen }) =>
      listen<string>("menu", (e) => {
        const id = e.payload.replace(/^nav:/, "");
        if (id === "back") stateRef.current.back();
        else if (id === "forward") stateRef.current.forward();
        else if (id === "settings") stateRef.current.go({ name: "settings" });
        else if (id === "shortcuts") setHelp(true);
        else if (id.startsWith("tab:")) { const t = TABS[Number(id.slice(4))]; if (t) stateRef.current.go(t.route); }
      }).then((u) => { off = u; }),
    );
    return () => off?.();
  }, []);

  if (!ready) return null;
  const lesson = route.name === "lesson" ? getLesson(route.id) : undefined;
  const due = dueReviews(progress).length;

  return (
    <Ctx.Provider value={state}>
      <header className="titlebar" data-tauri-drag-region>
        <div className="history">
          <button aria-label="Назад" title="Назад (⌘[)" disabled={!nav.canBack} onClick={state.back}>‹</button>
          <button aria-label="Вперёд" title="Вперёд (⌘])" disabled={!nav.canForward} onClick={state.forward}>›</button>
        </div>
        <nav className="tabs" data-tauri-drag-region>
          {TABS.map((t) => (
            <button key={t.label} className={route.name === t.route.name || t.sub.includes(route.name) ? "tab active" : "tab"} onClick={() => state.go(t.route)}>
              {t.label}
              {t.route.name === "home" && due > 0 && <span className="badge">{due}</span>}
            </button>
          ))}
        </nav>
        <button
          className={route.name === "settings" ? "tab settings active" : "tab settings"}
          aria-label="Настройки" title="Настройки (⌘,)"
          onClick={() => state.go({ name: "settings" })}
        >⚙︎</button>
      </header>
      {pending && (
        <div className="leave-bar" role="alertdialog">
          <span>{pending.message}</span>
          <button className="small" onClick={pending.run}>Выйти</button>
          <button className="ghost small" autoFocus onClick={() => setPending(null)}>Остаться</button>
        </div>
      )}
      <main className={WIDE.has(route.name) ? "wide" : undefined}>
        {error && <p className="error" onClick={() => setError(null)}>{error}</p>}
        {route.name === "home" && <Home />}
        {route.name === "map" && <MapScreen />}
        {route.name === "lesson" && lesson && <LessonScreen key={lesson.id} lesson={lesson} focus={route.focus} />}
        {route.name === "test" && <TestScreen key={JSON.stringify(route)} route={route} />}
        {route.name === "review" && <ReviewScreen />}
        {route.name === "words" && <WordsScreen />}
        {route.name === "settings" && <SettingsScreen />}
        {route.name === "final" && <FinalScreen key={route.blockId} blockId={route.blockId} />}
        {route.name === "blitz" && <BlitzScreen key={route.blockId ?? "all"} blockId={route.blockId} />}
        {route.name === "stories" && <StoriesScreen />}
        {route.name === "story" && <StoryScreen key={route.id} id={route.id} focus={route.focus} />}
        {route.name === "notes" && <NotesScreen />}
        {route.name === "onboarding" && <OnboardingScreen />}
      </main>
      {toastText && <div className="toast" role="status">{toastText}</div>}
      <SwipeNav back={state.back} forward={state.forward} canBack={nav.canBack} canForward={nav.canForward} />
      {help && <ShortcutsHelp onClose={() => setHelp(false)} />}
    </Ctx.Provider>
  );
}
