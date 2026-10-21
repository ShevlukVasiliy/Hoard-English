import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getLesson } from "../shared/lessons";
import { dueReviews } from "../shared/progress";
import { withReminderHint } from "../shared/stats";
import { derive, mergeEvents, nextId, seedEvents, SHARED_SETTINGS, type EventBody, type JournalEvent } from "../shared/journal";
import { newDeviceId, sync, SyncError, type SyncConfig, type WordsSnapshot } from "../shared/sync";
import type { AnkiCache, AnkiQueueItem, HighlightsFile, Settings } from "../shared/types";
import { DEFAULT_SETTINGS, NOTES_DECK, STORIES_DECK } from "../shared/types";
import { detectLang, setLang, T } from "../shared/i18n";
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
import { Ctx, type AppState, type Route, type SyncStatus } from "./state";
import { inTauri, loadAnki, loadHighlights, loadJournal, loadProgress, loadSettings, loadSyncConfig, saveAnki, saveHighlights, saveJournal, saveProgress, saveSettings, saveSyncConfig } from "./storage";
import { addToAnki, flushQueue, setMenuLang, syncAutostart } from "./system";
import { TestScreen } from "./TestScreen";
import { useUpdateAvailable } from "./update";
import { WordsScreen } from "./WordsScreen";

// Вкладки; sub — экраны внутри вкладки, при которых она подсвечена.
export const TABS: { route: Route; tab: keyof typeof T.tabs; sub: Route["name"][] }[] = [
  { route: { name: "home" }, tab: "home", sub: ["review", "test", "blitz"] },
  { route: { name: "map" }, tab: "map", sub: ["lesson", "final"] },
  { route: { name: "stories" }, tab: "stories", sub: ["story"] },
  { route: { name: "notes" }, tab: "notes", sub: [] },
  { route: { name: "words" }, tab: "words", sub: [] },
];

// В браузерном режиме стартовый экран можно задать в адресе JSON-ом: #{"name":"map"}.
function devRoute(): Route | undefined {
  if (inTauri || !location.hash) return;
  try { return JSON.parse(decodeURIComponent(location.hash.slice(1))) as Route; } catch { return undefined; }
}

const EMPTY_WORDS: WordsSnapshot = { syncedAt: "", deck: "", words: [] };

// Экраны, которым нужна ширина под поля.
const WIDE = new Set<Route["name"]>(["lesson"]);

export function App() {
  const [events, setEventsState] = useState<JournalEvent[]>([]);
  const [localSettings, setSettingsState] = useState<Settings>(DEFAULT_SETTINGS);
  const [words, setWordsState] = useState<WordsSnapshot>(EMPTY_WORDS);
  const [syncCfg, setSyncCfgState] = useState<SyncConfig>({ device: "" });
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({ state: "idle" });
  const [toastText, setToastText] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const nav = useHistory(devRoute() ?? { name: "home" });
  const route = nav.route;
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const guard = useRef<string | null>(null);
  const [pending, setPending] = useState<{ message: string; run: () => void } | null>(null);
  const [help, setHelp] = useState(false);
  const updateAvailable = useUpdateAvailable();
  const [updateHidden, setUpdateHidden] = useState(false);
  const setLeaveGuard = useCallback((m: string | null) => { guard.current = m; }, []);

  // журнал и настройки синхронизации читаются в обработчиках — через ref, чтобы не брать устаревшие
  const eventsRef = useRef<JournalEvent[]>([]);
  const syncRef = useRef<SyncConfig>(syncCfg);
  const wordsRef = useRef<WordsSnapshot>(words);
  wordsRef.current = words;

  const derived = useMemo(() => derive(events), [events]);
  const progress = useMemo(() => withReminderHint(derived.progress), [derived.progress]);
  const settings = useMemo<Settings>(() => ({ ...localSettings, ...derived.shared }), [localSettings, derived.shared]);
  const anki = useMemo<AnkiCache>(() => ({ ...words, queue: derived.queue }), [words, derived.queue]);
  const highlights = useMemo<HighlightsFile>(() => ({ items: derived.highlights }), [derived.highlights]);

  // язык выбирается до рендера экранов: от него зависят строки и контент уроков
  const lang = settings.lang ?? (settings.onboarded ? "ru" : detectLang());
  setLang(lang);
  // меню и трей на Rust перестраиваются под язык
  useEffect(() => { if (inTauri) setMenuLang(lang).catch(() => {}); }, [lang]);

  const fail = (what: keyof typeof T.app.what) => (e: unknown) => setError(T.app.notSaved(T.app.what[what], e));

  const setEvents = (next: JournalEvent[]) => {
    eventsRef.current = next;
    setEventsState(next);
    saveJournal({ events: next }).catch(fail("journal"));
  };

  useEffect(() => {
    (async () => {
      const [p, s, a, h, j, c] = await Promise.all([loadProgress(), loadSettings(), loadAnki(), loadHighlights(), loadJournal(), loadSyncConfig()]);
      const cfg: SyncConfig = c ?? { device: newDeviceId() };
      if (!c) await saveSyncConfig(cfg);
      // первый запуск с журналом: всё накопленное раньше становится стартовым снимком
      let ev = j?.events;
      if (!ev) {
        ev = seedEvents(cfg.device, new Date().toISOString(), p, h.items, a.queue);
        await saveJournal({ events: ev });
      }
      eventsRef.current = ev;
      syncRef.current = cfg;
      setEventsState(ev);
      setSettingsState(s);
      setWordsState({ syncedAt: a.syncedAt, deck: a.deck, words: a.words });
      setSyncCfgState(cfg);
      if (!s.onboarded && !devRoute()) nav.go({ name: "onboarding" });
      // автозапуск включается по настройке при первом запуске и не расходится с системой
      syncAutostart(s.autostart).catch(() => {});
    })()
      .catch((e) => setError(T.app.readFailed(e)))
      .finally(() => setReady(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // производные файлы: progress.json читает фоновое напоминание, highlights.json — копия
  useEffect(() => {
    if (!ready) return;
    saveProgress(progress).catch(fail("progress"));
    saveHighlights(highlights).catch(fail("notes"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, progress, highlights]);

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

  const toast = (message: string) => {
    clearTimeout(toastTimer.current);
    setToastText(message);
    toastTimer.current = setTimeout(() => setToastText(null), 3200);
  };

  // --- синхронизация ---
  const syncTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const syncing = useRef(false);
  const again = useRef(false);

  const setSyncConfig = (c: SyncConfig) => {
    syncRef.current = c;
    setSyncCfgState(c);
    saveSyncConfig(c).catch(fail("sync"));
  };

  const record = (body: EventBody): JournalEvent => {
    const cur = eventsRef.current;
    const e = { ...body, id: nextId(cur, syncRef.current.device), at: new Date().toISOString() } as JournalEvent;
    setEvents(mergeEvents(cur, [e]));
    scheduleSync(4000);
    return e;
  };

  // очередь Anki уходит с Mac; ушедшее отмечается в журнале и доходит до телефона
  const flushAnki = async (): Promise<number> => {
    if (!inTauri) return 0;
    const queue = derive(eventsRef.current).queue;
    if (!queue.length) return 0;
    const ids = await flushQueue(settings.ankiDeck, queue).catch(() => [] as string[]);
    if (ids.length) record({ t: "ankiSent", ids });
    return ids.length;
  };

  const runSync = async (manual = false) => {
    const cfg = syncRef.current;
    if (!cfg.token) return;
    if (syncing.current) { again.current = true; return; }
    syncing.current = true;
    setSyncStatus({ state: "syncing" });
    try {
      const w = wordsRef.current;
      const r = await sync(cfg, { events: eventsRef.current, words: w.syncedAt ? w : undefined, ownsWords: inTauri });
      // события, записанные во время синхронизации, не теряются
      const merged = mergeEvents(eventsRef.current, r.events);
      if (merged.length !== eventsRef.current.length) setEvents(merged);
      if (r.words) { setWordsState(r.words); saveAnki({ ...r.words, queue: [] }).catch(fail("words")); }
      const at = new Date().toISOString();
      setSyncConfig({ ...syncRef.current, gistId: r.gistId, lastSync: at });
      setSyncStatus({ state: "ok", at });
      await flushAnki();
    } catch (e) {
      const offline = e instanceof SyncError && e.offline;
      setSyncStatus({ state: offline ? "offline" : "error", message: e instanceof Error ? e.message : String(e) });
      if (manual && !offline) toast(T.app.syncFailed(e instanceof Error ? e.message : String(e)));
    } finally {
      syncing.current = false;
      if (again.current) { again.current = false; scheduleSync(1000); }
    }
  };

  const scheduleSync = (ms: number) => {
    if (!syncRef.current.token) return;
    clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(() => { runSync().catch(() => {}); }, ms);
  };

  // при запуске, при возврате в приложение и раз в 10 минут, пока оно открыто
  useEffect(() => {
    if (!ready) return;
    scheduleSync(300);
    const onVisible = () => { if (document.visibilityState === "visible") scheduleSync(300); };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    window.addEventListener("online", onVisible);
    const timer = setInterval(() => { if (document.visibilityState === "visible") scheduleSync(0); }, 10 * 60_000);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
      window.removeEventListener("online", onVisible);
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, syncCfg.token]);

  // Отправка в Anki: дубликат считается доставленным, недоступный Anki — очередь.
  const send = async (item: Omit<AnkiQueueItem, "id">): Promise<"sent" | "queued"> => {
    try {
      await addToAnki(item.deck ?? settings.ankiDeck, item);
      return "sent";
    } catch (e) {
      if (String(e).includes("duplicate")) return "sent";
      record({ t: "ankiQueue", item });
      return "queued";
    }
  };
  const queuedNote = inTauri ? T.app.queuedDesktop : T.app.queuedPhone;

  const stateRef = useRef<AppState>(null!);
  const state: AppState = {
    progress, settings, anki, highlights,
    record,
    setSettings: (s: Settings) => {
      // общие настройки уходят в журнал, остальные — только на этом устройстве
      for (const k of SHARED_SETTINGS) if (s[k] !== settings[k]) record({ t: "setting", key: k, value: s[k] });
      setSettingsState(s);
      saveSettings(s).catch(fail("settings"));
    },
    setWords: (w: WordsSnapshot) => {
      setWordsState(w);
      saveAnki({ ...w, queue: [] }).catch(fail("words"));
      scheduleSync(1000);
    },
    flushAnki,
    queueWord: (front, back) => send({ front, back, source: "lesson", addedAt: new Date().toISOString() }),
    sync: { config: syncCfg, status: syncStatus, setConfig: (c) => { setSyncConfig(c); if (c.token) scheduleSync(0); }, run: () => runSync(true) },
    sendNoteToAnki: async (h) => {
      const lesson = getLesson(h.lessonId);
      const now = new Date().toISOString();
      const r = await send({ front: h.text, back: lesson ? T.app.noteBack(lesson.title, lesson.subtitle) : "Hoard", source: "note", addedAt: now, deck: NOTES_DECK });
      record({ t: "notesInAnki", ids: [h.id] });
      toast(r === "sent" ? T.app.noteSent(NOTES_DECK) : T.app.noteQueued(queuedNote));
    },
    sendStoriesToAnki: async (lessons) => {
      const now = new Date().toISOString();
      let sent = 0, queued = 0;
      for (const l of lessons) {
        if (!l.story) continue;
        const r = await send({ front: l.story.question, back: T.app.storyBack(l.story.takeaway ?? l.story.title, l.story.title, l.title), source: "story", addedAt: now, deck: STORIES_DECK });
        if (r === "sent") sent++; else queued++;
      }
      record({ t: "storiesInAnki", ids: lessons.map((l) => l.id) });
      toast(queued ? T.app.storiesQueued(sent, queued, queuedNote) : T.app.storiesSent(sent, STORIES_DECK));
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
          <button aria-label={T.nav.back} title={T.nav.backKey} disabled={!nav.canBack} onClick={state.back}>‹</button>
          <button aria-label={T.nav.forward} title={T.nav.forwardKey} disabled={!nav.canForward} onClick={state.forward}>›</button>
        </div>
        <nav className="tabs" data-tauri-drag-region>
          {TABS.map((t) => (
            <button key={t.tab} className={route.name === t.route.name || t.sub.includes(route.name) ? "tab active" : "tab"} onClick={() => state.go(t.route)}>
              {T.tabs[t.tab]}
              {t.route.name === "home" && due > 0 && <span className="badge">{due}</span>}
            </button>
          ))}
        </nav>
        <button
          className={route.name === "settings" ? "tab settings active" : "tab settings"}
          aria-label={T.nav.settings} title={T.nav.settingsKey}
          onClick={() => state.go({ name: "settings" })}
        >⚙︎</button>
      </header>
      {pending && (
        <div className="leave-bar" role="alertdialog">
          <span>{pending.message}</span>
          <button className="small" onClick={pending.run}>{T.nav.leave}</button>
          <button className="ghost small" autoFocus onClick={() => setPending(null)}>{T.nav.stay}</button>
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
      {updateAvailable && !updateHidden && !toastText && (
        <div className="update-bar" role="status">
          <span>{T.nav.update}</span>
          <button className="small" onClick={() => location.reload()}>{T.nav.reload}</button>
          <button className="link small" aria-label={T.nav.later} onClick={() => setUpdateHidden(true)}>{T.nav.later}</button>
        </div>
      )}
      {toastText && <div className="toast" role="status">{toastText}</div>}
      <SwipeNav back={state.back} forward={state.forward} canBack={nav.canBack} canForward={nav.canForward} />
      {help && <ShortcutsHelp onClose={() => setHelp(false)} />}
    </Ctx.Provider>
  );
}
