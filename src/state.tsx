import { createContext, useContext } from "react";
import type { AnkiCache, Progress, Settings } from "../shared/types";

export type Route =
  | { name: "home" }
  | { name: "map" }
  | { name: "lesson"; id: string }
  | { name: "test"; kind: "placement" | "monthly" }
  | { name: "test"; kind: "block"; blockId: string }
  | { name: "review" }
  | { name: "words" }
  | { name: "settings" };

export type AppState = {
  progress: Progress;
  settings: Settings;
  anki: AnkiCache;
  setProgress: (p: Progress) => void;
  setSettings: (s: Settings) => void;
  setAnki: (a: AnkiCache) => void;
  go: (r: Route) => void;
};

export const Ctx = createContext<AppState | null>(null);

export function useApp(): AppState {
  const s = useContext(Ctx);
  if (!s) throw new Error("useApp вне Ctx");
  return s;
}
