import { BLOCKS, LESSONS, blockLessons } from "./lessons";
import type { Lesson, LessonBlock, Level, Progress } from "./types";
import { BLOCK_PASS_RATIO, LEVELS } from "./types";

const DAY = 86_400_000;

// Начало ISO-недели (понедельник, UTC) в миллисекундах.
export function weekStart(iso: string | number): number {
  const d = new Date(iso);
  const day = (d.getUTCDay() + 6) % 7;
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - day * DAY;
}

// Сколько недель подряд было хотя бы одно занятие. Текущая неделя без занятий серию не обрывает.
export function weekStreak(activity: string[], now = new Date().toISOString()): number {
  const weeks = new Set(activity.map(weekStart));
  let w = weekStart(now);
  if (!weeks.has(w)) w -= 7 * DAY;
  let n = 0;
  while (weeks.has(w)) {
    n++;
    w -= 7 * DAY;
  }
  return n;
}

export const studiedThisWeek = (activity: string[], now = new Date().toISOString()) =>
  activity.some((a) => weekStart(a) === weekStart(now));

export const levelIndex = (l: Level) => LEVELS.indexOf(l);

export const currentLevel = (p: Progress): Level | undefined => p.level?.value;

export const mastery = (p: Progress, topic: string) => p.topics[topic]?.score;

export function blockPassed(p: Progress, block: LessonBlock): boolean {
  return p.tests.some((t) => t.kind === "block" && t.blockId === block.id && t.correct / t.total >= BLOCK_PASS_RATIO);
}

export function blockStatus(p: Progress, block: LessonBlock) {
  const lessons = blockLessons(block);
  const done = lessons.filter((l) => p.lessons[l.id]).length;
  return { done, total: lessons.length, passed: blockPassed(p, block), ready: done === lessons.length };
}

// Сколько уроков осталось до конца текущего (первого незакрытого) блока.
export function currentBlock(p: Progress): LessonBlock | undefined {
  const lvl = p.level ? levelIndex(p.level.value) : 0;
  return BLOCKS.find((b) => levelIndex(b.level) >= lvl - 1 && !blockPassed(p, b)) ?? BLOCKS.find((b) => !blockPassed(p, b));
}

// Слабая тема — освоенность ниже порога.
export const WEAK = 0.6;

// Рекомендации: сначала непройденные уроки текущего блока, затем уроки слабых тем,
// затем следующие уроки по порядку, не выше уровня +1.
export function recommendations(p: Progress, limit = 3): Lesson[] {
  const lvl = p.level ? levelIndex(p.level.value) : 0;
  const fits = (l: Lesson) => levelIndex(l.level) <= lvl + 1;
  const out: Lesson[] = [];
  const add = (l: Lesson) => { if (!out.includes(l) && fits(l)) out.push(l); };

  const block = currentBlock(p);
  if (block) blockLessons(block).filter((l) => !p.lessons[l.id]).forEach(add);

  LESSONS.filter((l) => p.lessons[l.id] && (mastery(p, l.topic) ?? 1) < WEAK)
    .sort((a, b) => (mastery(p, a.topic) ?? 0) - (mastery(p, b.topic) ?? 0))
    .forEach(add);

  for (const b of BLOCKS) blockLessons(b).filter((l) => !p.lessons[l.id]).forEach(add);
  return out.slice(0, limit);
}

export const nextLesson = (p: Progress) => recommendations(p, 1)[0];

export const isRecommended = (p: Progress, l: Lesson) => recommendations(p, 5).includes(l);

// Пишется в progress.json при каждом сохранении, чтобы фоновый поток знал про блок.
export function withReminderHint(p: Progress): Progress {
  const b = currentBlock(p);
  if (!b) return { ...p, nextBlock: undefined };
  const s = blockStatus(p, b);
  return { ...p, nextBlock: { title: b.title, lessonsLeft: s.total - s.done } };
}
