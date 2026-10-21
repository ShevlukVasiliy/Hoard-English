import { expect, test } from "bun:test";
import { addHighlight, locate, removeHighlight, trimSpan } from "./highlights";
import { LESSONS, validateCatalog } from "./lessons";
import { practiceSet } from "./practice";
import { BLITZ_SIZE, blitzSet, trapsTest, TRAPS_SIZE } from "./tests";
import { BLOCKS } from "./lessons";
import { EMPTY_PROGRESS, PRACTICE_SIZE } from "./types";

const text = "Past Perfect — это had + V3. Им отмечают действие, которое закончилось раньше.";

test("фрагмент находится по смещению, а после правок — по тексту", () => {
  expect(locate(text, { start: 15, text: "это had" })).toBe(15);
  expect(locate("Новое начало. " + text, { start: 15, text: "это had" })).toBe(29);
  expect(locate(text, { start: 0, text: "нет такого" })).toBeUndefined();
});

test("края с пробелами срезаются, слишком короткое не сохраняется", () => {
  expect(trimSpan(text, 14, 22)).toEqual([15, 22]);
  expect(trimSpan(text, 14, 15)).toBeUndefined();
});

test("пересекающиеся фрагменты склеиваются", () => {
  let items = addHighlight([], { lessonId: "l", part: "theory:0", start: 0, end: 12, partText: text }).items;
  items = addHighlight(items, { lessonId: "l", part: "theory:1", start: 0, end: 12, partText: text }).items;
  const r = addHighlight(items, { lessonId: "l", part: "theory:0", start: 5, end: 27, partText: text });
  expect(r.items.length).toBe(2);
  expect(r.added.text).toBe(text.slice(0, 27));
  expect(removeHighlight(r.items, r.added.id).length).toBe(1);
});

test("каталог согласован: истории с эпохой и вопросом, глубокие версии на месте", () => {
  expect(validateCatalog()).toEqual([]);
  for (const l of LESSONS) {
    expect(l.story?.era, l.id).toBeDefined();
    expect(l.story?.question.length, l.id).toBeGreaterThan(10);
  }
});

test("после 9–10 из 10 в практике больше сложных заданий", () => {
  const l = LESSONS.find((x) => x.exercises.filter((e) => e.hard).length >= 6);
  if (!l) return; // сложность размечается в контенте (Stage 14)
  const strong = { ...EMPTY_PROGRESS, lessons: { [l.id]: { completedAt: "", score: 10, total: 10, attempts: 1 } } };
  const set = practiceSet(l, strong);
  expect(set.length).toBe(PRACTICE_SIZE);
  expect(new Set(set.map((e) => e.id)).size).toBe(PRACTICE_SIZE);
  expect(set.filter((e) => e.hard).length).toBeGreaterThanOrEqual(5);
  expect(practiceSet(l, EMPTY_PROGRESS).filter((e) => e.hard).length).toBeLessThanOrEqual(3);
});

test("блиц: 15 вопросов с выбором; ловушки: 12 заданий блока", () => {
  const all = blitzSet(EMPTY_PROGRESS);
  expect(all.length).toBe(BLITZ_SIZE);
  expect(all.every((q) => q.ex.kind === "choice")).toBe(true);
  for (const b of BLOCKS) {
    const bl = blitzSet(EMPTY_PROGRESS, b.id);
    expect(bl.length, b.id).toBe(BLITZ_SIZE);
    expect(bl.every((q) => b.lessonIds.includes(q.lessonId) || q.lessonId === `traps:${b.id}`)).toBe(true);
    const tr = trapsTest(b.id);
    expect(tr.length, b.id).toBe(TRAPS_SIZE);
    expect(new Set(tr.map((q) => `${q.lessonId}/${q.ex.id}`)).size).toBe(tr.length);

  }
});

test("ловушки и сложные задания: эталон засчитывается, фраза с ошибкой — нет", async () => {
  const { TRAPS } = await import("./lessons/traps");
  const { checkAnswer, correctAnswer } = await import("./check");
  const all = [...Object.values(TRAPS).flat(), ...LESSONS.flatMap((l) => l.exercises.filter((e) => e.hard))];
  for (const ex of all) {
    expect(checkAnswer(ex, ex.kind === "choice" ? String(ex.answer) : correctAnswer(ex)), ex.id).toBe(true);
    if (ex.kind === "fix") expect(checkAnswer(ex, ex.prompt), ex.prompt).toBe(false);
    if (ex.kind === "choice") {
      expect(ex.answer).toBeLessThan(ex.options.length);
      expect(new Set(ex.options).size).toBe(ex.options.length);
    }
  }
  for (const [id, list] of Object.entries(TRAPS)) {
    expect(BLOCKS.some((b) => b.id === id), id).toBe(true);
    expect(new Set(list.map((e) => e.id)).size).toBe(list.length);
  }
  for (const l of LESSONS) expect(l.exercises.filter((e) => e.hard).length, l.id).toBeGreaterThanOrEqual(6);
});
