import { expect, test } from "bun:test";
import { checkAnswer, correctAnswer } from "./check";
import { getLesson } from "./lessons";
import { dueReviews, recordLesson, recordReview } from "./progress";
import { nextLesson, withReminderHint } from "./stats";
import { Placement, findExercise, recordTest } from "./tests";
import { EMPTY_PROGRESS, type Exercise } from "./types";

// так ответ передаёт интерфейс: для выбора — индекс варианта
const answerFor = (ex: Exercise) => (ex.kind === "choice" ? String(ex.answer) : correctAnswer(ex));

test("сквозной сценарий: тест → уровень → урок → ошибки → повтор → подсказка напоминания", () => {
  const t0 = "2026-10-21T10:00:00.000Z";
  // входной тест: верно до B1 включительно
  const pl = new Placement();
  while (!pl.done) {
    const q = pl.next()!;
    const ok = ["A1", "A2", "B1"].includes(q.level);
    pl.answer(q, ok, ok ? answerFor(q.ex) : "x");
  }
  let p = recordTest(EMPTY_PROGRESS, "placement", pl.answers, undefined, t0);
  expect(p.level?.value).toBe("B1");

  // урок с одной ошибкой
  const lesson = nextLesson(p)!;
  const [bad, ...good] = lesson.exercises.slice(0, 10);
  p = recordLesson(p, lesson, [
    { exerciseId: bad!.id, correct: false, given: "wrong" },
    ...good.map((e) => ({ exerciseId: e.id, correct: true, given: answerFor(e) })),
  ], t0);
  expect(p.lessons[lesson.id]?.score).toBe(9);

  // через день ошибка урока и ошибки теста приходят на повтор и решаются
  const day1 = "2026-10-22T11:00:00.000Z";
  const due = dueReviews(p, day1);
  expect(due.some((r) => r.lessonId === lesson.id)).toBe(true);
  for (const r of due) {
    const ex = findExercise(r.lessonId, r.exerciseId)!;
    expect(ex).toBeDefined();
    expect(checkAnswer(ex, answerFor(ex))).toBe(true);
    p = recordReview(p, r, true, answerFor(ex), day1);
  }
  expect(dueReviews(p, day1)).toHaveLength(0);
  expect(getLesson(lesson.id)).toBeDefined();

  // подсказка для фонового уведомления
  const hinted = withReminderHint(p);
  expect(hinted.nextBlock?.title).toBeTruthy();
  expect(hinted.nextBlock!.lessonsLeft).toBeGreaterThanOrEqual(0);
});
