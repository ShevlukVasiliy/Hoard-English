import { useMemo, useState } from "react";
import { T } from "../shared/i18n";
import { dueReviews, recordReview } from "../shared/progress";
import { findExercise } from "../shared/tests";
import { useApp } from "./state";
import { Quiz } from "./Quiz";

export function ReviewScreen() {
  const { progress, record, go } = useApp();
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
      <h1>{T.review.title}</h1>
      <p>{T.review.nothing}</p>
      <button onClick={() => go({ name: "home" })}>{T.review.toHome}</button>
    </article>
  );

  if (done !== null) return (
    <article>
      <h1>{T.review.title}</h1>
      <p className="big">{T.review.score(done, items.length)}</p>
      <p className="muted">{T.review.after}</p>
      <button onClick={() => go({ name: "home" })}>{T.review.toHome}</button>
    </article>
  );

  return (
    <article>
      <h1>{T.review.titleRun}</h1>
      <Quiz
        total={items.length}
        next={(i) => items[i] && { key: `${items[i].r.lessonId}/${items[i].r.exerciseId}`, ex: items[i].ex }}
        onAnswer={(i, a) => {
          // каждый ответ сохраняем сразу, чтобы не потерять при закрытии окна
          const r = items[i]!.r;
          const e = record({ t: "review", lessonId: r.lessonId, exerciseId: r.exerciseId, correct: a.correct, given: a.given });
          setP(recordReview(p, r, a.correct, a.given, e.at));
        }}
        onFinish={(answers) => setDone(answers.filter((a) => a.correct).length)}
      />
    </article>
  );
}
