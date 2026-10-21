import { inTauri } from "./storage";
import { invoke } from "@tauri-apps/api/core";
import { cleanWords } from "../shared/anki";
import type { AnkiCache, AnkiQueueItem, AnkiWord, Settings } from "../shared/types";

// Системные функции Tauri; в браузере — ничего не делают.
export async function setAutostart(on: boolean) {
  if (!inTauri) return;
  const { enable, disable } = await import("@tauri-apps/plugin-autostart");
  await (on ? enable() : disable());
}

export async function syncAutostart(on: boolean) {
  if (!inTauri) return;
  const { isEnabled } = await import("@tauri-apps/plugin-autostart");
  if ((await isEnabled()) !== on) await setAutostart(on);
}

type Profile = { name: string; path: string };

// Путь к коллекции: из настроек или первый найденный профиль Anki.
async function collectionPath(s: Settings): Promise<string> {
  if (s.ankiPath) return s.ankiPath;
  const profiles = await invoke<Profile[]>("anki_profiles");
  if (!profiles.length) throw new Error("не найдено ни одного профиля Anki");
  return profiles[0]!.path;
}

export async function syncAnki(s: Settings, prev: AnkiCache): Promise<AnkiCache> {
  if (!inTauri) throw new Error("чтение Anki доступно только в приложении");
  const path = await collectionPath(s);
  const raw = await invoke<AnkiWord[]>("anki_words", { path, deck: s.ankiDeck });
  return { syncedAt: new Date().toISOString(), deck: s.ankiDeck, words: cleanWords(raw), queue: prev.queue };
}

export async function addToAnki(deck: string, item: Pick<AnkiQueueItem, "front" | "back">): Promise<void> {
  if (!inTauri) throw new Error("AnkiConnect доступен только в приложении");
  await invoke("anki_add_note", { deck, front: item.front, back: item.back });
}

// Отправляет очередь; то, что не ушло, остаётся в очереди.
export async function flushQueue(deck: string, cache: AnkiCache): Promise<{ cache: AnkiCache; sent: number }> {
  const left: AnkiQueueItem[] = [];
  let sent = 0;
  for (const item of cache.queue) {
    try {
      await addToAnki(item.deck ?? deck, item);
      sent++;
    } catch (e) {
      // дубликат уже в колоде — считаем доставленным
      if (String(e).includes("duplicate")) sent++;
      else left.push(item);
    }
  }
  return { cache: { ...cache, queue: left }, sent };
}
