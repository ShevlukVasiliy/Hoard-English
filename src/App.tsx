import { useCallback, useEffect, useRef, useState } from "react";
import { getLesson } from "../shared/lessons";
import { dueReviews } from "../shared/progress";
import { withReminderHint } from "../shared/stats";
import type { AnkiCache, Progress, Settings } from "../shared/types";
import { DEFAULT_SETTINGS, EMPTY_PROGRESS } from "../shared/types";
import { useHistory } from "./history";
import { Home } from "./Home";
import { LessonScreen } from "./LessonScreen";
import { MapScreen } from "./MapScreen";
import { ReviewScreen } from "./ReviewScreen";
import { installSelectionPaint } from "./selection";
import { SettingsScreen } from "./SettingsScreen";
import { Ctx, type AppState, type Route } from "./state";
import { EMPTY_ANKI, inTauri, loadAnki, loadProgress, loadSettings, saveAnki, saveProgress, saveSettings } from "./storage";
import { syncAutostart } from "./system";
import { TestScreen } from "./TestScreen";
import { WordsScreen } from "./WordsScreen";

const TABS: { route: Route; label: string }[] = [
  { route: { name: "home" }, label: "Главная" },
  { route: { name: "map" }, label: "Уроки" },
  { route: { name: "words" }, label: "Слова" },
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
  const nav = useHistory(devRoute() ?? { name: "home" });
  const route = nav.route;
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const guard = useRef<string | null>(null);
  const [pending, setPending] = useState<{ message: string; run: () => void } | null>(null);
  const setLeaveGuard = useCallback((m: string | null) => { guard.current = m; }, []);

  useEffect(() => {
    Promise.all([loadProgress(), loadSettings(), loadAnki()])
      .then(([p, s, a]) => {
        setProgressState(p);
        setSettingsState(s);
        setAnkiState(a);
        // автозапуск включается по настройке при первом запуске и не расходится с системой
        syncAutostart(s.autostart).catch(() => {});
      })
      .catch((e) => setError(`Не удалось прочитать данные: ${e}`))
      .finally(() => setReady(true));
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
  const state: AppState = {
    progress, settings, anki,
    setProgress: (raw: Progress) => { const p = withReminderHint(raw); setProgressState(p); saveProgress(p).catch(fail("Прогресс")); },
    setSettings: (s: Settings) => { setSettingsState(s); saveSettings(s).catch(fail("Настройки")); },
    setAnki: (a: AnkiCache) => { setAnkiState(a); saveAnki(a).catch(fail("Кэш Anki")); },
    go: (r: Route) => guarded(() => nav.go(r))(),
    back: guarded(nav.back),
    forward: guarded(nav.forward),
    setLeaveGuard,
  };

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
            <button key={t.label} className={route.name === t.route.name ? "tab active" : "tab"} onClick={() => state.go(t.route)}>
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
        {route.name === "lesson" && lesson && <LessonScreen key={lesson.id} lesson={lesson} />}
        {route.name === "test" && <TestScreen key={JSON.stringify(route)} route={route} />}
        {route.name === "review" && <ReviewScreen />}
        {route.name === "words" && <WordsScreen />}
        {route.name === "settings" && <SettingsScreen />}
      </main>
    </Ctx.Provider>
  );
}
