import { useEffect, useState } from "react";
import { getLesson } from "../shared/lessons";
import { dueReviews } from "../shared/progress";
import { withReminderHint } from "../shared/stats";
import type { AnkiCache, Progress, Settings } from "../shared/types";
import { DEFAULT_SETTINGS, EMPTY_PROGRESS } from "../shared/types";
import { Home } from "./Home";
import { LessonScreen } from "./LessonScreen";
import { MapScreen } from "./MapScreen";
import { ReviewScreen } from "./ReviewScreen";
import { SettingsScreen } from "./SettingsScreen";
import { Ctx, type Route } from "./state";
import { EMPTY_ANKI, loadAnki, loadProgress, loadSettings, saveAnki, saveProgress, saveSettings } from "./storage";
import { installSelectionPaint } from "./selection";
import { syncAutostart } from "./system";
import { TestScreen } from "./TestScreen";
import { WordsScreen } from "./WordsScreen";

const TABS: { route: Route; label: string }[] = [
  { route: { name: "home" }, label: "Главная" },
  { route: { name: "map" }, label: "Уроки" },
  { route: { name: "words" }, label: "Слова" },
  { route: { name: "settings" }, label: "Настройки" },
];

export function App() {
  const [progress, setProgressState] = useState<Progress>(EMPTY_PROGRESS);
  const [settings, setSettingsState] = useState<Settings>(DEFAULT_SETTINGS);
  const [anki, setAnkiState] = useState<AnkiCache>(EMPTY_ANKI);
  const [route, setRoute] = useState<Route>({ name: "home" });
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (settings.theme === "system") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = settings.theme;
  }, [settings.theme]);

  const fail = (what: string) => (e: unknown) => setError(`${what} не сохранён: ${e}`);
  const state = {
    progress, settings, anki,
    setProgress: (raw: Progress) => { const p = withReminderHint(raw); setProgressState(p); saveProgress(p).catch(fail("Прогресс")); },
    setSettings: (s: Settings) => { setSettingsState(s); saveSettings(s).catch(fail("Настройки")); },
    setAnki: (a: AnkiCache) => { setAnkiState(a); saveAnki(a).catch(fail("Кэш Anki")); },
    go: (r: Route) => { setRoute(r); window.scrollTo(0, 0); },
  };

  if (!ready) return null;
  const lesson = route.name === "lesson" ? getLesson(route.id) : undefined;
  const due = dueReviews(progress).length;

  return (
    <Ctx.Provider value={state}>
      <nav>
        {TABS.map((t) => (
          <button key={t.label} className={route.name === t.route.name ? "tab active" : "tab"} onClick={() => state.go(t.route)}>
            {t.label}
            {t.route.name === "home" && due > 0 && <span className="badge">{due}</span>}
          </button>
        ))}
      </nav>
      <main>
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
