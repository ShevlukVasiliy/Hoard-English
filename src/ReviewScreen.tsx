import { useMemo, useState } from "react";
import { dueReviews, recordReview } from "../shared/progress";
import { findExercise } from "../shared/tests";
import { useApp } from "./state";
import { Quiz } from "./Quiz";

export function ReviewScreen() {
  const { progress, setProgress, go } = useApp();
  // фиксируем список на старте сессии; задания удалённых уроков пропускаем
  const items = useMemo(
    () => dueReviews(progress).flatMap((r) => {
      const ex = findExercise(r.lessonId, r.exerciseId);
      return ex ? [{ r, ex }] : [];
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const [done, setDone] = useState<number | null>(null);
  const [p, setP] = useState(progress);

  if (!items.length) return (
    <article>
      <h1>Повторение</h1>
      <p>Сегодня повторять нечего. Ошибки возвращаются через 1, 3, 7 и 21 день.</p>
      <button onClick={() => go({ name: "home" })}>На главную</button>
    </article>
  );

  if (done !== null) return (
    <article>
      <h1>Повторение</h1>
      <p className="big">{done} из {items.length}</p>
      <p className="muted">Верные ответы уходят на следующий интервал, ошибки — снова через день.</p>
      <button onClick={() => go({ name: "home" })}>На главную</button>
    </article>
  );

  return (
    <article>
      <h1>Повторение ошибок</h1>
      <Quiz
        total={items.length}
        next={(i) => items[i] && { key: `${items[i].r.lessonId}/${items[i].r.exerciseId}`, ex: items[i].ex }}
        onAnswer={(i, a) => {
          // каждый ответ сохраняем сразу, чтобы не потерять при закрытии окна
          const next = recordReview(p, items[i]!.r, a.correct, a.given);
          setP(next);
          setProgress(next);
        }}
        onFinish={(answers) => setDone(answers.filter((a) => a.correct).length)}
      />
    </article>
  );
}
