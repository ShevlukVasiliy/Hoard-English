import { T } from "../shared/i18n";
import { inTauri } from "./storage";
import { invoke } from "@tauri-apps/api/core";
import { cleanWords } from "../shared/anki";
import type { WordsSnapshot } from "../shared/sync";
import type { AnkiQueueItem, AnkiWord, Settings } from "../shared/types";

// Системные функции Tauri; в браузере — ничего не делают.
export async function setAutostart(on: boolean) {
  if (!inTauri) return;
  const { enable, disable } = await import("@tauri-apps/plugin-autostart");
  await (on ? enable() : disable());
}

// В режиме разработки автозапуск не трогаем: иначе он запомнит путь к отладочной сборке.
// В собранном приложении включение каждый раз переписывает путь — он мог смениться
// (например, после переименования приложения).
export async function syncAutostart(on: boolean) {
  if (!inTauri || import.meta.env.DEV) return;
  const { isEnabled } = await import("@tauri-apps/plugin-autostart");
  if (on) await setAutostart(true);
  else if (await isEnabled()) await setAutostart(false);
}

type Profile = { name: string; path: string };

// Путь к коллекции: из настроек или первый найденный профиль Anki.
async function collectionPath(s: Settings): Promise<string> {
  if (s.ankiPath) return s.ankiPath;
  const profiles = await invoke<Profile[]>("anki_profiles");
  if (!profiles.length) throw new Error(T.anki.notFound);
  return profiles[0]!.path;
}

export async function syncAnki(s: Settings): Promise<WordsSnapshot> {
  if (!inTauri) throw new Error(T.anki.desktopOnly);
  const path = await collectionPath(s);
  const raw = await invoke<AnkiWord[]>("anki_words", { path, deck: s.ankiDeck });
  return { syncedAt: new Date().toISOString(), deck: s.ankiDeck, words: cleanWords(raw) };
}

export async function addToAnki(deck: string, item: Pick<AnkiQueueItem, "front" | "back">): Promise<void> {
  if (!inTauri) throw new Error(T.anki.connectOnly);
  await invoke("anki_add_note", { deck, front: item.front, back: item.back });
}

// Отправляет очередь; возвращает id ушедших. То, что не ушло, остаётся в очереди.
export async function flushQueue(deck: string, queue: AnkiQueueItem[]): Promise<string[]> {
  const sent: string[] = [];
  for (const item of queue) {
    try {
      await addToAnki(item.deck ?? deck, item);
      sent.push(item.id!);
    } catch (e) {
      // дубликат уже в колоде — считаем доставленным
      if (String(e).includes("duplicate")) sent.push(item.id!);
      else if (String(e).includes("AnkiConnect")) break;
    }
  }
  return sent;
}

// Язык меню приложения и трея (src-tauri/src/i18n.rs).
export const setMenuLang = (lang: string) => invoke("set_lang", { lang });
