import type { Lesson, Progress, ReviewItem } from "./types";
import { REVIEW_INTERVALS } from "./types";

export type Answer = { exerciseId: string; correct: boolean; given: string };
export type TopicAnswer = Answer & { lessonId: string; topic: string };

const DAY = 86_400_000;
const addDays = (iso: string, days: number) => new Date(Date.parse(iso) + days * DAY).toISOString();

// Вес нового результата в скользящей оценке освоенности темы.
const MASTERY_WEIGHT = 0.3;

// Общая часть для уроков и тестов: освоенность тем, ошибки на повтор, отметка занятия.
export function recordAnswers(p: Progress, answers: TopicAnswer[], now = new Date().toISOString()): Progress {
  const topics = { ...p.topics };
  const groups = new Map<string, TopicAnswer[]>();
  for (const a of answers) groups.set(a.topic, [...(groups.get(a.topic) ?? []), a]);
  for (const [topic, list] of groups) {
    const ratio = list.filter((a) => a.correct).length / list.length;
    const t = topics[topic];
    topics[topic] = {
      score: t ? t.score * (1 - MASTERY_WEIGHT) + ratio * MASTERY_WEIGHT : ratio,
      answered: (t?.answered ?? 0) + list.length,
      updatedAt: now,
    };
  }

  // ошибка ставится на повтор через первый интервал; повторная ошибка сбрасывает шаг
  const wrong = answers.filter((a) => !a.correct);
  const reviews = p.reviews.filter((r) => !wrong.some((a) => a.lessonId === r.lessonId && a.exerciseId === r.exerciseId));
  for (const a of wrong)
    reviews.push({ lessonId: a.lessonId, exerciseId: a.exerciseId, given: a.given, firstAt: now, dueAt: addDays(now, REVIEW_INTERVALS[0]), stage: 0 });

  return { ...p, topics, reviews, activity: [...p.activity, now] };
}

export function recordLesson(p: Progress, lesson: Pick<Lesson, "id" | "topic">, answers: Answer[], now = new Date().toISOString()): Progress {
  const score = answers.filter((a) => a.correct).length;
  const prev = p.lessons[lesson.id];
  const next = recordAnswers(p, answers.map((a) => ({ ...a, lessonId: lesson.id, topic: lesson.topic })), now);
  return {
    ...next,
    lessons: {
      ...next.lessons,
      [lesson.id]: {
        completedAt: now,
        score: Math.max(score, prev?.score ?? 0),
        total: answers.length,
        attempts: (prev?.attempts ?? 0) + 1,
      },
    },
    stories: next.stories.includes(lesson.id) ? next.stories : [...next.stories, lesson.id],
  };
}

// Ответ в сессии повторения: верно — следующий интервал или выход из очереди, неверно — с начала.
export function recordReview(p: Progress, item: ReviewItem, correct: boolean, given: string, now = new Date().toISOString()): Progress {
  const rest = p.reviews.filter((r) => !(r.lessonId === item.lessonId && r.exerciseId === item.exerciseId));
  const stage = correct ? item.stage + 1 : 0;
  const next = stage < REVIEW_INTERVALS.length ? [{ ...item, given, stage, dueAt: addDays(now, REVIEW_INTERVALS[stage]!) }] : [];
  return { ...p, reviews: [...rest, ...next], activity: [...p.activity, now] };
}

export const dueReviews = (p: Progress, now = new Date().toISOString()) => p.reviews.filter((r) => r.dueAt <= now);
