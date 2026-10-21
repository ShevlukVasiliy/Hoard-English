import { expect, test } from "bun:test";
import { LESSONS } from "./lessons";
import { dueReviews, recordLesson, recordReview } from "./progress";
import { EMPTY_PROGRESS } from "./types";

const lesson = LESSONS[0]!;
const t0 = "2026-10-21T10:00:00.000Z";

test("урок: счёт, освоенность, ошибки на повтор", () => {
  const p = recordLesson(EMPTY_PROGRESS, lesson, [
    { exerciseId: "1", correct: true, given: "1" },
    { exerciseId: "2", correct: false, given: "0" },
  ], t0);
  expect(p.lessons[lesson.id]).toMatchObject({ score: 1, total: 2, attempts: 1 });
  expect(p.topics[lesson.topic]!.score).toBe(0.5);
  expect(p.reviews).toHaveLength(1);
  expect(p.stories).toEqual([lesson.id]);
  expect(dueReviews(p, t0)).toHaveLength(0);
  expect(dueReviews(p, "2026-10-22T10:00:00.000Z")).toHaveLength(1);
});

test("повтор: интервалы 1/3/7/21, затем выход из очереди", () => {
  let p = recordLesson(EMPTY_PROGRESS, lesson, [{ exerciseId: "2", correct: false, given: "0" }], t0);
  for (const days of [3, 7, 21]) {
    p = recordReview(p, p.reviews[0]!, true, "1", t0);
    expect(p.reviews[0]!.dueAt).toBe(new Date(Date.parse(t0) + days * 86_400_000).toISOString());
  }
  p = recordReview(p, p.reviews[0]!, true, "1", t0);
  expect(p.reviews).toHaveLength(0);
});
