import { useState } from "react";
import { T } from "../shared/i18n";
import type { Exercise } from "../shared/types";
import { ExerciseView } from "./ExerciseView";

export type QuizAnswer = { correct: boolean; given: string };

// Последовательность заданий; next() может выдавать задания на лету (адаптивный тест).
type Props = {
  total: number;
  next: (answered: number) => { key: string; ex: Exercise } | undefined;
  onAnswer?: (index: number, a: QuizAnswer) => void;
  onFinish: (answers: QuizAnswer[]) => void;
  // число вопросов заранее неизвестно (входной тест может закончиться раньше)
  openEnded?: boolean;
};

export function Quiz({ total, next, onAnswer, onFinish, openEnded }: Props) {
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [current, setCurrent] = useState(() => next(0));
  if (!current) return null;
  return (
    <>
      <div className="progressbar"><div style={{ width: `${(answers.length / total) * 100}%` }} /></div>
      <p className="muted">{openEnded ? T.exercise.question(answers.length + 1) : T.exercise.task(answers.length + 1, total)}</p>
      <ExerciseView
        key={current.key}
        ex={current.ex}
        onDone={(correct, given) => {
          const all = [...answers, { correct, given }];
          onAnswer?.(answers.length, { correct, given });
          setAnswers(all);
          const n = all.length < total ? next(all.length) : undefined;
          if (n) setCurrent(n);
          else onFinish(all);
        }}
      />
    </>
  );
}
