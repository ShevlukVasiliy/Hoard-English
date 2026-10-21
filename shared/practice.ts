import { sample, shuffle } from "./random";
import type { Exercise, Lesson, Progress } from "./types";
import { PRACTICE_SIZE } from "./types";

// Урок уже пройден на 9–10 из 10 — при повторе сложных заданий больше.
export const STRONG = 0.9;
const HARD_SHARE = { normal: 0.2, strong: 0.6 };

export function practiceSet(lesson: Lesson, p: Progress, size = PRACTICE_SIZE): Exercise[] {
  const prev = p.lessons[lesson.id];
  const strong = !!prev && prev.score / prev.total >= STRONG;
  const hard = lesson.exercises.filter((e) => e.hard);
  const rest = lesson.exercises.filter((e) => !e.hard);
  const wantHard = Math.min(hard.length, Math.round(size * (strong ? HARD_SHARE.strong : HARD_SHARE.normal)));
  const picked = [...sample(hard, wantHard), ...sample(rest, size - wantHard)];
  // банка не хватило на один из видов — добираем из другого
  if (picked.length < size) picked.push(...sample(lesson.exercises.filter((e) => !picked.includes(e)), size - picked.length));
  return shuffle(picked);
}
