import { expect, test } from "bun:test";
import { BLOCKS } from "./lessons";
import { recommendations, weekStreak } from "./stats";
import { BLOCK_TEST_SIZE, PLACEMENT_MIN, PLACEMENT_SIZE, Placement, blockTest, estimateLevel, monthlyDue, recordTest, type Answered } from "./tests";
import { EMPTY_PROGRESS, type Level } from "./types";

const fake = (level: Level, correct: boolean, n: number): Answered[] =>
  Array.from({ length: n }, (_, i) => ({ lessonId: "x", level, topic: "t", ex: { id: String(i), kind: "gap", prompt: "", answers: [] }, correct, given: "" }));

test("оценка уровня", () => {
  expect(estimateLevel([...fake("A1", true, 4), ...fake("A2", true, 4), ...fake("B1", false, 4)])).toBe("A2");
  expect(estimateLevel(fake("A1", false, 5))).toBe("A1");
  expect(estimateLevel([...fake("A2", true, 3), ...fake("B1", true, 3), ...fake("B2", true, 2)])).toBe("B1");
});

test("адаптивный тест: сильный ученик поднимается, слабый опускается", () => {
  for (const [ok, check] of [[true, (l: Level) => ["B2", "C1"].includes(l)], [false, (l: Level) => l === "A1"]] as const) {
    const p = new Placement();
    while (!p.done) { const q = p.next()!; p.answer(q, ok, ""); }
    const n = p.answers.length;
    expect(n).toBeGreaterThanOrEqual(PLACEMENT_MIN);
    expect(n).toBeLessThanOrEqual(PLACEMENT_SIZE);
    expect(new Set(p.answers.map((a) => `${a.lessonId}/${a.ex.id}`)).size).toBe(n);
    expect(check(estimateLevel(p.answers))).toBe(true);
  }
});

test("входной тест: темы не повторяются подряд, не больше двух на тему, есть разные типы", () => {
  for (let run = 0; run < 50; run++) {
    const p = new Placement();
    while (!p.done) { const q = p.next()!; p.answer(q, Math.random() < 0.6, ""); }
    const topics = p.answers.map((a) => a.topic);
    for (let i = 1; i < topics.length; i++) expect(topics[i]).not.toBe(topics[i - 1]);
    const count = new Map<string, number>();
    for (const t of topics) count.set(t, (count.get(t) ?? 0) + 1);
    expect(Math.max(...count.values())).toBeLessThanOrEqual(2);
    expect(new Set(p.answers.map((a) => a.ex.kind)).size).toBeGreaterThan(1);
  }
});

test("контрольная блока: 15 вопросов из уроков блока", () => {
  for (const b of BLOCKS) {
    const qs = blockTest(b.id);
    expect(qs.length).toBe(BLOCK_TEST_SIZE);
    expect(qs.every((q) => b.lessonIds.includes(q.lessonId))).toBe(true);
  }
});

test("закрытые блоки поднимают уровень, ошибки уходят на повтор", () => {
  let p = recordTest(EMPTY_PROGRESS, "placement", [...fake("A1", true, 4), ...fake("A2", false, 4)]);
  expect(p.level?.value).toBe("A1");
  expect(p.reviews.length).toBe(4);
  for (const b of BLOCKS.filter((b) => b.level === "A1")) p = recordTest(p, "block", fake("A1", true, 15), b.id);
  expect(p.level?.value).toBe("A2");
  expect(p.level?.source).toBe("block");
  expect(monthlyDue(p)).toBe(false);
  expect(monthlyDue(p, Date.now() + 31 * 86_400_000)).toBe(true);
});

test("серия недель и рекомендации", () => {
  const now = "2026-10-21T12:00:00Z";
  expect(weekStreak(["2026-10-07T10:00:00Z", "2026-10-14T10:00:00Z"], now)).toBe(2);
  expect(weekStreak(["2026-10-07T10:00:00Z", "2026-10-20T10:00:00Z"], now)).toBe(1);
  expect(weekStreak([], now)).toBe(0);
  const rec = recommendations(EMPTY_PROGRESS);
  expect(rec[0]?.id).toBe(BLOCKS[0]!.lessonIds[0]);
});

test("банк входного теста: 200+ вопросов, 40+ на уровень, ответы проверяются", async () => {
  const { PLACEMENT_BANK } = await import("./placement");
  const { checkAnswer, correctAnswer } = await import("./check");
  expect(PLACEMENT_BANK.length).toBeGreaterThanOrEqual(200);
  for (const lvl of ["A1", "A2", "B1", "B2", "C1"]) expect(PLACEMENT_BANK.filter((q) => q.level === lvl).length).toBeGreaterThanOrEqual(40);
  for (const q of PLACEMENT_BANK) expect(checkAnswer(q.ex, q.ex.kind === "choice" ? String(q.ex.answer) : correctAnswer(q.ex)), q.ex.id).toBe(true);
  for (const q of PLACEMENT_BANK) if (q.ex.kind === "fix") expect(checkAnswer(q.ex, q.ex.prompt), q.ex.id).toBe(false);
  const { LESSONS } = await import("./lessons");
  const topics = new Set(LESSONS.map((l) => l.topic));
  for (const q of PLACEMENT_BANK) {
    if (q.ex.kind !== "choice") continue;
    expect(q.ex.answer).toBeLessThan(q.ex.options.length);
    expect(new Set(q.ex.options).size).toBe(q.ex.options.length);
    expect(topics.has(q.topic), q.topic).toBe(true);
  }
  expect(new Set(PLACEMENT_BANK.map((q) => q.ex.id)).size).toBe(PLACEMENT_BANK.length);
});
