import { irregularByForm } from "./dict";
import { LESSONS } from "./lessons";
import { levelIndex } from "./stats";
import { VOCAB, vocab } from "./vocab";
import type { AnkiWord, Level } from "./types";

// Служебные и самые частые слова, которые предлагать бессмысленно.
const STOP = new Set("about above after again against because before being below between could doesn't during further having himself herself itself myself other ourselves should their themselves there these those through under until where which while would yourself always never often usually every something someone anything nothing really before already yesterday tomorrow people little because without another anyone either everyone everything".split(" "));

// lessonId пустой — слово из CEFR-J без примера из урока.
export type Suggestion = { word: string; example: string; lessonId: string; level: Level; pos?: string };

const sentences = (text: string) => text.replace(/[`*]/g, "").split(/(?<=[.!?])\s+|\n+/).filter((s) => /[a-z]/i.test(s) && !/[а-яё]/i.test(s));

// Детерминированная выборка: один и тот же набор в течение дня, без «прыгающего» списка.
function sampleStable<T>(items: T[], n: number): T[] {
  if (items.length <= n) return items;
  const day = Math.floor(Date.now() / 86_400_000);
  const step = Math.floor(items.length / n);
  return Array.from({ length: n }, (_, i) => items[(i * step + day) % items.length]!);
}

// Слова из примеров и историй уроков до уровня +1, которых нет в колоде (ни карточкой, ни внутри фраз).
export function suggestions(deck: AnkiWord[], level: Level = "B1", limit = 20): Suggestion[] {
  const known = new Set<string>();
  for (const c of deck) for (const w of c.front.toLowerCase().match(/[a-z']+/g) ?? []) known.add(w);
  const out = new Map<string, Suggestion>();
  const max = levelIndex(level) + 1;
  for (const l of LESSONS) {
    if (levelIndex(l.level) > max) continue;
    const prompts = l.exercises.flatMap((e) =>
      // пример с заполненным пропуском, чтобы в карточку попало правильное предложение
      e.kind === "choice" ? [e.prompt.replace("___", e.options[e.answer] ?? "")] : e.kind === "gap" && !/___.*___/.test(e.prompt) ? [e.prompt.replace("___", e.answers[0] ?? "").replace(/\s*\([^)]*\)/g, "")] : [],
    );
    const texts = [...l.theory.flatMap((b) => (b.examples ?? []).map((e) => e.en)), ...prompts].flatMap(sentences);
    for (const s of texts)
      for (const w of s.match(/\b[a-z]{6,}\b(?!')/g) ?? []) {
        // только настоящие словарные слова: отсекает обрывки и словоформы вроде cheaper
        if (!vocab(w) || STOP.has(w) || irregularByForm(w) || known.has(w) || out.has(w) || /(ing|ed|ly|s|est)$/.test(w) || /^(more|most)/.test(w)) continue;
        out.set(w, { word: w, example: s.trim(), lessonId: l.id, level: l.level });
      }
  }
  // сначала слова уровня ученика, затем по порядку уроков
  const fromLessons = [...out.values()].sort((a, b) => Math.abs(levelIndex(a.level) - max + 1) - Math.abs(levelIndex(b.level) - max + 1));
  // добор из CEFR-J: значимые слова текущего уровня, которых нет в колоде
  const own = levelIndex(level);
  const fromVocab = VOCAB.filter((v) => levelIndex(v.level) === own && v.word.length >= 5 && /^[a-z]+$/.test(v.word) && !known.has(v.word) && !out.has(v.word) && v.pos.some((p) => ["noun", "verb", "adjective", "adverb"].includes(p)))
    .sort((a, b) => a.word.localeCompare(b.word))
    .map((v) => ({ word: v.word, example: `${v.pos.join(", ")} · ${v.level} · CEFR-J`, lessonId: "", level: v.level, pos: v.pos.join(", ") }));
  const half = Math.ceil(limit / 2);
  return [...fromLessons.slice(0, half), ...sampleStable(fromVocab, limit - Math.min(half, fromLessons.length))].slice(0, limit);
}
