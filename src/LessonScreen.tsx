import { useMemo, useState } from "react";
import { recordLesson } from "../shared/progress";
import { sample } from "../shared/random";
import type { Lesson } from "../shared/types";
import { PRACTICE_SIZE } from "../shared/types";
import { Markup } from "./Markup";
import { Quiz, type QuizAnswer } from "./Quiz";
import { useApp } from "./state";
import { Theory } from "./Theory";

export function LessonScreen({ lesson }: { lesson: Lesson }) {
  const { progress, setProgress, go } = useApp();
  const [phase, setPhase] = useState<"theory" | "practice" | "result">("theory");
  const tasks = useMemo(() => sample(lesson.exercises, PRACTICE_SIZE), [lesson]);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const score = answers.filter((a) => a.correct).length;

  const finish = (all: QuizAnswer[]) => {
    setAnswers(all);
    setProgress(recordLesson(progress, lesson, all.map((a, i) => ({ ...a, exerciseId: tasks[i]!.id }))));
    setPhase("result");
  };

  return (
    <article>
      <header>
        <p className="muted">{lesson.level}</p>
        <h1>{lesson.title}</h1>
        <p className="muted">{lesson.subtitle}</p>
      </header>

      {phase === "theory" && (
        <>
          <Theory blocks={lesson.theory} />
          <button onClick={() => setPhase("practice")}>К практике</button>
        </>
      )}

      {phase === "practice" && (
        <Quiz total={tasks.length} next={(i) => tasks[i] && { key: tasks[i].id, ex: tasks[i] }} onFinish={finish} />
      )}

      {phase === "result" && (
        <>
          <section className="result">
            <h2>{score} из {answers.length}</h2>
            {score < answers.length && <p className="muted">Ошибки вернутся на повторение через день.</p>}
          </section>
          {lesson.story ? (
            <section className="story reading">
              <p className="label">История про язык</p>
              <h2>{lesson.story.title}</h2>
              <Markup text={lesson.story.text} />
              {lesson.story.takeaway && <p className="takeaway">{lesson.story.takeaway}</p>}
            </section>
          ) : (
            <p className="muted">У этого урока нет истории.</p>
          )}
          <div className="row">
            <button onClick={() => go({ name: "home" })}>На главную</button>
            <button className="ghost" onClick={() => go({ name: "map" })}>К карте уроков</button>
          </div>
        </>
      )}
    </article>
  );
}
