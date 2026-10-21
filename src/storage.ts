import { invoke } from "@tauri-apps/api/core";
import type { AnkiCache, HighlightsFile, Progress, Settings } from "../shared/types";
import { DEFAULT_SETTINGS, EMPTY_PROGRESS } from "../shared/types";

// Вне Tauri (vite в браузере) — localStorage, чтобы интерфейс можно было смотреть без сборки.
export const inTauri = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

async function read(name: string): Promise<string | null> {
  if (inTauri) return invoke<string | null>("read_data", { name });
  try { return localStorage.getItem(name); } catch { return null; }
}

async function write(name: string, contents: string): Promise<void> {
  if (inTauri) return invoke("write_data", { name, contents });
  try { localStorage.setItem(name, contents); } catch { /* браузерный режим без хранилища */ }
}

// новые поля появляются со временем — дополняем старые файлы значениями по умолчанию
async function readJson<T extends object>(name: string, fallback: T): Promise<T> {
  const raw = await read(name);
  return raw ? { ...fallback, ...(JSON.parse(raw) as Partial<T>) } : fallback;
}

export const loadProgress = () => readJson<Progress>("progress.json", EMPTY_PROGRESS);
export const saveProgress = (p: Progress) => write("progress.json", JSON.stringify(p, null, 2));

// Старые настройки: напоминание раз в неделю в reminderWeekday/reminderHour.
// Час сохраняем, напоминание становится ежедневным.
export async function loadSettings(): Promise<Settings> {
  const s = await readJson<Settings>("settings.json", DEFAULT_SETTINGS);
  if (s.reminderHour === undefined) return s;
  const { reminderWeekday: _d, reminderHour, ...rest } = s;
  return { ...rest, reminderMinutes: reminderHour * 60 };
}
export const saveSettings = (s: Settings) => write("settings.json", JSON.stringify(s, null, 2));

export const loadHighlights = () => readJson<HighlightsFile>("highlights.json", { items: [] });
export const saveHighlights = (h: HighlightsFile) => write("highlights.json", JSON.stringify(h, null, 2));

export const EMPTY_ANKI: AnkiCache = { syncedAt: "", deck: "", words: [], queue: [] };
export const loadAnki = () => readJson<AnkiCache>("anki-words.json", EMPTY_ANKI);
export const saveAnki = (a: AnkiCache) => write("anki-words.json", JSON.stringify(a, null, 2));

