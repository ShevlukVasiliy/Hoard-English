import { createContext, useContext } from "react";
import type { EventBody, JournalEvent } from "../shared/journal";
import type { SyncConfig, WordsSnapshot } from "../shared/sync";
import type { AnkiCache, Highlight, HighlightsFile, Lesson, Progress, Settings } from "../shared/types";

export type Route =
  | { name: "home" }
  | { name: "map" }
  // focus — id сохранённого фрагмента, к которому прокрутить
  | { name: "lesson"; id: string; focus?: string }
  | { name: "test"; kind: "placement" | "monthly" }
  | { name: "test"; kind: "block" | "traps"; blockId: string }
  | { name: "final"; blockId: string }
  | { name: "blitz"; blockId?: string }
  | { name: "review" }
  | { name: "stories" }
  | { name: "story"; id: string; focus?: string }
  | { name: "notes" }
  | { name: "words" }
  | { name: "settings" }
  | { name: "onboarding" };

export type SyncStatus =
  | { state: "idle" | "syncing" }
  | { state: "ok"; at: string }
  | { state: "offline" | "error"; message: string };

export type AppState = {
  // прогресс, заметки и очередь Anki вычисляются из журнала действий
  progress: Progress;
  settings: Settings;
  anki: AnkiCache;
  highlights: HighlightsFile;
  // записать действие в журнал; возвращает событие с id и временем
  record: (e: EventBody) => JournalEvent;
  setSettings: (s: Settings) => void;
  // словарь колоды, прочитанный из Anki
  setWords: (w: WordsSnapshot) => void;
  // отправить очередь в Anki (только на Mac); сколько ушло
  flushAnki: () => Promise<number>;
  // слово в Anki: сразу или в очередь
  queueWord: (front: string, back: string) => Promise<"sent" | "queued">;
  sync: { config: SyncConfig; status: SyncStatus; setConfig: (c: SyncConfig) => void; run: () => Promise<void> };
  // отправка в Anki; если Anki закрыт — в очередь
  sendNoteToAnki: (h: Highlight) => void;
  sendStoriesToAnki: (lessons: Lesson[]) => void;
  // короткое сообщение внизу экрана
  toast: (message: string) => void;
  go: (r: Route) => void;
  back: () => void;
  forward: () => void;
  // экран просит подтвердить уход (например, во время практики); null — снять
  setLeaveGuard: (message: string | null) => void;
};

export const Ctx = createContext<AppState | null>(null);

export function useApp(): AppState {
  const s = useContext(Ctx);
  if (!s) throw new Error("useApp вне Ctx");
  return s;
}
