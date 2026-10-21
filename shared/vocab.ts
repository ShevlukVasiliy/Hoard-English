import data from "./data/vocab.json";
import type { Level } from "./types";

// CEFR-J Wordlist 1.5 (Yukio Tono, TUFS): слово → части речи и минимальный уровень.
// Свободное использование при указании источника; см. README.
export type VocabEntry = { word: string; pos: string[]; level: Level };

const MAP = new Map<string, VocabEntry>();
for (const [word, pos, level] of data as [string, string, Level][]) {
  const e = MAP.get(word);
  if (!e) MAP.set(word, { word, pos: [pos], level });
  else {
    if (!e.pos.includes(pos)) e.pos.push(pos);
    if (level < e.level) e.level = level;
  }
}

export const vocab = (w: string) => MAP.get(w.toLowerCase());
export const VOCAB: VocabEntry[] = [...MAP.values()];
