import type { Lesson, LessonBlock } from "../types";
import { LEVELS } from "../types";
import { part1 } from "./part1";
import { part2 } from "./part2";
import { part3 } from "./part3";
import { part4 } from "./part4";
import { part5 } from "./part5";
import { part6 } from "./part6";
import { EXTRA } from "./extra";
import { STORIES } from "./stories";

export const LESSONS: Lesson[] = [...part3, ...part1, ...part2, ...part4, ...part5, ...part6].map((l) => ({
  ...l,
  exercises: [...l.exercises, ...(EXTRA[l.id] ?? [])],
  story: l.story ?? STORIES[l.id],
}));

// Блоки идут в порядке прохождения; у каждого в конце контрольная.
export const BLOCKS: LessonBlock[] = [
  { id: "basics", title: "Основы", level: "A1", lessonIds: ["to-be", "have-got", "there-is-are"] },
  { id: "nouns", title: "Существительные", level: "A1", lessonIds: ["plurals", "possessives", "countable-uncountable"] },
  { id: "verbs-basic", title: "Умения, прошлое, сравнения", level: "A2", lessonIds: ["can-could", "past-simple-basics", "comparatives"] },
  { id: "tenses-basic", title: "Настоящее и прошедшее", level: "A2", lessonIds: ["present-simple-continuous", "past-simple-continuous"] },
  { id: "perfect", title: "Perfect", level: "B1", lessonIds: ["present-perfect-past-simple", "present-perfect-continuous"] },
  { id: "future-articles", title: "Будущее и артикли", level: "B1", lessonIds: ["future-forms", "articles"] },
  { id: "conditionals-passive", title: "Условия и пассив", level: "B1", lessonIds: ["conditionals-1-2", "passive-voice"] },
  { id: "verb-patterns", title: "Формы глагола", level: "B1", lessonIds: ["gerund-infinitive", "used-to-would"] },
  { id: "linking", title: "Связки и вопросы", level: "B1", lessonIds: ["relative-clauses", "question-tags"] },
  { id: "small-words", title: "Маленькие слова", level: "B1", lessonIds: ["prepositions-time-place", "quantifiers"] },
  { id: "everyday-modals", title: "Надо и слишком", level: "B1", lessonIds: ["obligation", "so-such-too-enough"] },
  { id: "narrative", title: "Narrative and reporting", level: "B2", lessonIds: ["past-perfect", "reported-speech"] },
  { id: "hypothetical", title: "Hypothetical and deduction", level: "B2", lessonIds: ["conditionals-3-mixed", "modals-deduction"] },
  { id: "future-wishes", title: "Future, wishes and linking", level: "B2", lessonIds: ["future-perfect-continuous", "wish-if-only", "linking-words"] },
  { id: "style", title: "Style and emphasis", level: "C1", lessonIds: ["participle-clauses", "cleft-sentences", "inversion", "emphasis"] },
];

const byId = new Map(LESSONS.map((l) => [l.id, l]));


export const getLesson = (id: string) => byId.get(id);

export const blockOf = (lessonId: string) => BLOCKS.find((b) => b.lessonIds.includes(lessonId));

export const blockLessons = (block: LessonBlock) =>
  block.lessonIds.map((id) => byId.get(id)).filter((l): l is Lesson => !!l);

export const lessonsByLevel = () =>
  LEVELS.map((level) => ({ level, lessons: LESSONS.filter((l) => l.level === level) })).filter((g) => g.lessons.length);

// Каталог должен быть согласован: каждый урок ровно в одном блоке, без дублей id.
export function validateCatalog(): string[] {
  const errors: string[] = [];
  if (byId.size !== LESSONS.length) errors.push("повторяющиеся id уроков");
  for (const l of LESSONS) {
    const n = BLOCKS.filter((b) => b.lessonIds.includes(l.id)).length;
    if (l.exercises.length < 15) errors.push(`${l.id}: в банке ${l.exercises.length} заданий, нужно 15+`);
    if (!l.story) errors.push(`${l.id}: нет истории`);
    if (n !== 1) errors.push(`${l.id}: в ${n} блоках`);
    const ids = new Set(l.exercises.map((e) => e.id));
    if (ids.size !== l.exercises.length) errors.push(`${l.id}: повторяющиеся id заданий`);
  }
  for (const id of Object.keys(EXTRA)) if (!byId.has(id)) errors.push(`EXTRA: нет урока ${id}`);
  for (const b of BLOCKS) for (const id of b.lessonIds) if (!byId.has(id)) errors.push(`${b.id}: нет урока ${id}`);
  return errors;
}
