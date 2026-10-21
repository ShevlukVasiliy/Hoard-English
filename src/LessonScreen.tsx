import { useEffect, useMemo, useState } from "react";
import { recordLesson } from "../shared/progress";
import { sample } from "../shared/random";
import type { Lesson } from "../shared/types";
import { PRACTICE_SIZE } from "../shared/types";
import { Markup } from "./Markup";
import { Quiz, type QuizAnswer } from "./Quiz";
import { useApp } from "./state";
import { Theory } from "./Theory";

type Phase = "theory" | "practice" | "result";
const STEPS: { phase: Phase; label: string }[] = [
  { phase: "theory", label: "Теория" },
  { phase: "practice", label: "Практика" },
  { phase: "result", label: "История" },
];

function Steps({ phase }: { phase: Phase }) {
  const at = STEPS.findIndex((s) => s.phase === phase);
  return (
    <ol className="steps" aria-label="Шаги урока">
      {STEPS.map((s, i) => (
        <li key={s.phase} className={i === at ? "current" : i < at ? "done" : undefined} aria-current={i === at ? "step" : undefined}>
          {i > 0 && <span className="sep" aria-hidden />}
          {s.label}
        </li>
      ))}
    </ol>
  );
}

export function LessonScreen({ lesson }: { lesson: Lesson }) {
  const { progress, setProgress, go, setLeaveGuard } = useApp();
  const [phase, setPhase] = useState<Phase>("theory");
  const tasks = useMemo(() => sample(lesson.exercises, PRACTICE_SIZE), [lesson]);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const score = answers.filter((a) => a.correct).length;

  // во время практики уход с экрана подтверждается: ответы ещё не сохранены
  useEffect(() => {
    setLeaveGuard(phase === "practice" ? "Выйти из урока? Ответы практики не сохранятся." : null);
    return () => setLeaveGuard(null);
  }, [phase, setLeaveGuard]);

  const finish = (all: QuizAnswer[]) => {
    setAnswers(all);
    setProgress(recordLesson(progress, lesson, all.map((a, i) => ({ ...a, exerciseId: tasks[i]!.id }))));
    setPhase("result");
    window.scrollTo(0, 0);
  };

  return (
    <article className="lesson-grid">
      <div className="lesson-main">
        <header className="lesson-head">
          <h1>{lesson.title}<span className="level">{lesson.level}</span></h1>
          <p className="muted">{lesson.subtitle}</p>
        </header>
        <Steps phase={phase} />

        {phase === "theory" && (
          <>
            <Theory blocks={lesson.theory} />
            <button onClick={() => { setPhase("practice"); window.scrollTo(0, 0); }}>К практике</button>
          </>
        )}

        {phase === "practice" && (
          <Quiz total={tasks.length} next={(i) => tasks[i] && { key: tasks[i].id, ex: tasks[i] }} onFinish={finish} />
        )}

        {phase === "result" && (
          <>
            <section className="result">
              <p className="big">{score} из {answers.length}</p>
              {score < answers.length && <p className="muted">Ошибки вернутся на повторение через день.</p>}
            </section>
            {lesson.story ? (
              <section className="story reading">
                <h2>{lesson.story.title}</h2>
                <div className="story-text"><Markup text={lesson.story.text} /></div>
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
      </div>
    </article>
  );
}
