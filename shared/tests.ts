import { BLOCKS, LESSONS, blockLessons, getLesson } from "./lessons";
import { PLACEMENT_BANK, PLACEMENT_LESSON } from "./placement";
import { recordAnswers } from "./progress";
import { sample, shuffle } from "./random";
import { blockPassed, levelIndex } from "./stats";
import type { Exercise, Level, Progress, TestKind, TestResult } from "./types";
import { LEVELS } from "./types";

// Вопрос теста = задание урока + его уровень, тема и урок (для повторения ошибок).
export type Question = { lessonId: string; level: Level; topic: string; ex: Exercise };

// Для тестов берём быстрые задания: выбор и пропуск.
const QUICK = new Set<Exercise["kind"]>(["choice", "gap"]);

export const QUESTION_BANK: Question[] = LESSONS.flatMap((l) =>
  l.exercises.filter((e) => QUICK.has(e.kind)).map((ex) => ({ lessonId: l.id, level: l.level, topic: l.topic, ex })),
);

// Входной тест и проверка уровня — из отдельного банка.
export const PLACEMENT_QUESTIONS: Question[] = PLACEMENT_BANK.map((p) => ({ lessonId: PLACEMENT_LESSON, ...p }));

// Задание по ключу из повторения: урок или банк входного теста.
export function findExercise(lessonId: string, exerciseId: string): Exercise | undefined {
  if (lessonId === PLACEMENT_LESSON) return PLACEMENT_BANK.find((p) => p.ex.id === exerciseId)?.ex;
  return getLesson(lessonId)?.exercises.find((e) => e.id === exerciseId);
}

export const questionKey = (q: Question) => `${q.lessonId}/${q.ex.id}`;

// Входной тест: не больше PLACEMENT_SIZE вопросов, но может закончиться
// после PLACEMENT_MIN, если оценка уровня перестала меняться.
export const PLACEMENT_SIZE = 25;
export const PLACEMENT_MIN = 18;
const PLACEMENT_STABLE = 5;
// Одна тема — не больше двух вопросов за тест.
const TOPIC_CAP = 2;
export const BLOCK_TEST_SIZE = 15;
export const MONTHLY_SIZE = 20;
// Уровень засчитан, если на нём ≥ 60% верных из ≥ 3 вопросов.
const LEVEL_PASS = 0.6;
const LEVEL_MIN = 3;

export type Answered = Question & { correct: boolean; given: string };

// Адаптивный тест: верный ответ поднимает сложность, неверный опускает.
// Стартуем с A2, уровни без вопросов в банке пропускаются.
export class Placement {
  private used = new Set<string>();
  private idx: number;
  readonly answers: Answered[] = [];
  private readonly levels: Level[];

  constructor(readonly size = PLACEMENT_SIZE, start: Level = "A2", private readonly bank: Question[] = PLACEMENT_QUESTIONS) {
    this.levels = LEVELS.filter((l) => bank.some((q) => q.level === l));
    this.idx = Math.max(0, this.levels.indexOf(start));
  }

  get done() {
    return this.answers.length >= this.size || this.settled() || !this.next();
  }

  // Оценка уровня не менялась последние PLACEMENT_STABLE ответов.
  private settled(): boolean {
    const n = this.answers.length;
    if (n < Math.min(PLACEMENT_MIN, this.size)) return false;
    const now = estimateLevel(this.answers);
    for (let k = 1; k <= PLACEMENT_STABLE; k++) if (estimateLevel(this.answers.slice(0, n - k)) !== now) return false;
    return true;
  }

  // Темы не повторяются подряд и не больше TOPIC_CAP раз; сначала нетронутые темы.
  next(): Question | undefined {
    if (this.answers.length >= this.size || this.settled()) return undefined;
    const last = this.answers[this.answers.length - 1];
    const count = new Map<string, number>();
    for (const a of this.answers) count.set(a.topic, (count.get(a.topic) ?? 0) + 1);
    const pick = (lvl: Level, strict: boolean) => {
      let pool = this.bank.filter((q) => q.level === lvl && !this.used.has(questionKey(q)));
      if (strict) pool = pool.filter((q) => q.topic !== last?.topic && (count.get(q.topic) ?? 0) < TOPIC_CAP);
      if (!pool.length) return undefined;
      const least = Math.min(...pool.map((q) => count.get(q.topic) ?? 0));
      pool = pool.filter((q) => (count.get(q.topic) ?? 0) === least);
      // в основном выбор из вариантов, примерно каждый третий — письменное задание;
      // два письменных подряд не бывает
      const choice = pool.filter((q) => q.ex.kind === "choice");
      const written = pool.filter((q) => q.ex.kind !== "choice");
      const want = last && last.ex.kind !== "choice" ? choice : Math.random() < 0.35 ? written : choice;
      return sample(want.length ? want : pool, 1)[0];
    };
    for (const strict of [true, false])
      for (let d = 0; d < this.levels.length; d++)
        for (const i of [this.idx - d, this.idx + d]) {
          const lvl = this.levels[i];
          const q = lvl && pick(lvl, strict);
          if (q) return q;
        }
  }

  answer(q: Question, correct: boolean, given: string) {
    this.used.add(questionKey(q));
    this.answers.push({ ...q, correct, given });
    const step = correct ? 1 : -1;
    this.idx = Math.min(this.levels.length - 1, Math.max(0, this.levels.indexOf(q.level) + step));
  }
}

// Итоговый уровень — самый высокий засчитанный при засчитанных всех ниже (с пропуском неопрошенных).
export function estimateLevel(answers: Answered[]): Level {
  let result: Level = "A1";
  for (const lvl of LEVELS) {
    const at = answers.filter((a) => a.level === lvl);
    if (!at.length) continue;
    const ok = at.filter((a) => a.correct).length / at.length;
    if (at.length >= LEVEL_MIN && ok >= LEVEL_PASS) result = lvl;
    else if (ok < LEVEL_PASS) break;
  }
  return result;
}

export function byTopic(answers: Answered[]): TestResult["byTopic"] {
  const out: TestResult["byTopic"] = {};
  for (const a of answers) {
    const t = (out[a.topic] ??= { correct: 0, total: 0 });
    t.total++;
    if (a.correct) t.correct++;
  }
  return out;
}

export function blockTest(blockId: string): Question[] {
  const block = BLOCKS.find((b) => b.id === blockId);
  if (!block) return [];
  const ids = new Set(blockLessons(block).map((l) => l.id));
  const pool = QUESTION_BANK.filter((q) => ids.has(q.lessonId));
  // поровну из каждого урока блока
  const per = shuffle([...ids]).map((id) => shuffle(pool.filter((q) => q.lessonId === id)));
  const out: Question[] = [];
  while (out.length < BLOCK_TEST_SIZE && per.some((p) => p.length)) for (const p of per) { const q = p.shift(); if (q && out.length < BLOCK_TEST_SIZE) out.push(q); }
  return shuffle(out);
}

// Ежемесячная проверка: текущий уровень и соседние.
export function monthlyTest(level: Level): Question[] {
  const i = levelIndex(level);
  const near = PLACEMENT_QUESTIONS.filter((q) => Math.abs(levelIndex(q.level) - i) <= 1);
  return sample(near, MONTHLY_SIZE);
}

export const MONTH = 30 * 86_400_000;

export function monthlyDue(p: Progress, now = Date.now()): boolean {
  if (!p.level) return false;
  const last = p.tests.filter((t) => t.kind !== "block").map((t) => Date.parse(t.at));
  return !last.length || now - Math.max(...last) >= MONTH;
}

// Записывает результат теста: история тестов, освоенность тем, ошибки на повтор, пересчёт уровня.
export function recordTest(p: Progress, kind: TestKind, answers: Answered[], blockId?: string, now = new Date().toISOString()): Progress {
  const correct = answers.filter((a) => a.correct).length;
  const level = kind === "block" ? undefined : estimateLevel(answers);
  const result: TestResult = { kind, at: now, blockId, correct, total: answers.length, level, byTopic: byTopic(answers) };
  let next = recordAnswers(p, answers.map((a) => ({ lessonId: a.lessonId, topic: a.topic, exerciseId: a.ex.id, correct: a.correct, given: a.given })), now);
  next = { ...next, tests: [...next.tests, result] };
  return { ...next, level: recomputeLevel(next, now) };
}

// Уровень: последняя оценка теста; если все блоки уровня закрыты контрольными — поднимаем на следующий.
export function recomputeLevel(p: Progress, now = new Date().toISOString()): Progress["level"] {
  const tested = [...p.tests].reverse().find((t) => t.level);
  let level: Progress["level"] = tested?.level ? { value: tested.level, source: tested.kind, at: tested.at } : p.level;
  if (!level) return undefined;
  for (;;) {
    const cur: Level = level.value;
    const blocks = BLOCKS.filter((b) => b.level === cur);
    const nextLvl: Level | undefined = LEVELS[levelIndex(cur) + 1];
    if (!nextLvl || !blocks.length || !blocks.every((b) => blockPassed(p, b))) break;
    level = { value: nextLvl, source: "block", at: now };
  }
  return level;
}
