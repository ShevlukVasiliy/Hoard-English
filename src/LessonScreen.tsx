import { useEffect, useMemo, useRef, useState } from "react";
import { T } from "../shared/i18n";
import { practiceSet } from "../shared/practice";
import type { Depth, Lesson, Story } from "../shared/types";
import { flashHighlight, SelectionMenu, useSavedPaint } from "./Highlights";
import { Markup } from "./Markup";
import { Quiz, type QuizAnswer } from "./Quiz";
import { useApp } from "./state";
import { Theory } from "./Theory";

type Phase = "theory" | "practice" | "result";
const STEPS: { phase: Phase; label: "theory" | "practice" | "story" }[] = [
  { phase: "theory", label: "theory" },
  { phase: "practice", label: "practice" },
  { phase: "result", label: "story" },
];

function Steps({ phase }: { phase: Phase }) {
  const at = STEPS.findIndex((s) => s.phase === phase);
  return (
    <ol className="steps" aria-label={T.lesson.steps}>
      {STEPS.map((s, i) => (
        <li key={s.phase} className={i === at ? "current" : i < at ? "done" : undefined} aria-current={i === at ? "step" : undefined}>
          {T.lesson[s.label]}
        </li>
      ))}
    </ol>
  );
}

// Тихий переключатель «кратко / подробно»; меняет настройку целиком.
export function DepthSwitch({ which }: { which: "theoryDepth" | "storyDepth" }) {
  const { settings, setSettings } = useApp();
  const opts: { v: Depth; label: string }[] = [{ v: "short", label: T.lesson.short }, { v: "long", label: T.lesson.long }];
  return (
    <div className="depth-switch" role="radiogroup" aria-label={which === "theoryDepth" ? T.lesson.theoryDepth : T.lesson.storyDepth}>
      {opts.map((o) => (
        <button
          key={o.v}
          role="radio"
          aria-checked={settings[which] === o.v}
          className={settings[which] === o.v ? "link on" : "link"}
          onClick={() => setSettings({ ...settings, [which]: o.v })}
        >{o.label}</button>
      ))}
    </div>
  );
}

// Текст истории с инициалом; подробная версия, если выбрана и написана.
export function StoryBody({ story }: { story: Story }) {
  const { settings } = useApp();
  const text = settings.storyDepth === "long" && story.long ? story.long : story.text;
  return (
    <>
      <div className="story-text reading" data-part="story"><Markup text={text} /></div>
      {story.takeaway && <p className="takeaway reading">{story.takeaway}</p>}
    </>
  );
}

export function LessonScreen({ lesson, focus }: { lesson: Lesson; focus?: string }) {
  const { progress, settings, record, go, setLeaveGuard, highlights } = useApp();
  const [phase, setPhase] = useState<Phase>("theory");
  // выборка фиксируется на входе в урок
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tasks = useMemo(() => practiceSet(lesson, progress), [lesson]);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const score = answers.filter((a) => a.correct).length;
  const root = useRef<HTMLElement>(null);
  useSavedPaint(root, lesson.id, [phase, settings.theoryDepth, settings.storyDepth]);

  // во время практики уход с экрана подтверждается: ответы ещё не сохранены
  useEffect(() => {
    setLeaveGuard(phase === "practice" ? T.lesson.leaveGuard : null);
    return () => setLeaveGuard(null);
  }, [phase, setLeaveGuard]);

  // переход из «Заметок» к фрагменту теории
  useEffect(() => {
    const h = focus && highlights.items.find((x) => x.id === focus);
    if (h && root.current) requestAnimationFrame(() => root.current && flashHighlight(root.current, h));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  const finish = (all: QuizAnswer[]) => {
    setAnswers(all);
    record({ t: "lesson", lessonId: lesson.id, topic: lesson.topic, answers: all.map((a, i) => ({ exerciseId: tasks[i]!.id, correct: a.correct, given: a.given })) });
    setPhase("result");
    window.scrollTo(0, 0);
  };

  return (
    <article className="lesson" ref={root}>
      <header className="lesson-head">
        <h1>{lesson.title}<span className="level">{lesson.level}</span></h1>
        <p className="muted">{lesson.subtitle}</p>
      </header>
      <Steps phase={phase} />

      {phase === "theory" && (
        <>
          {lesson.theory.some((b) => b.more) && <DepthSwitch which="theoryDepth" />}
          <Theory blocks={lesson.theory} depth={settings.theoryDepth} />
          <div className="row">
            <button onClick={() => { setPhase("practice"); window.scrollTo(0, 0); }}>{T.lesson.toPractice}</button>
            <span className="muted small">{T.lesson.selectHint}</span>
          </div>
        </>
      )}

      {phase === "practice" && (
        <Quiz total={tasks.length} next={(i) => tasks[i] && { key: tasks[i].id, ex: tasks[i] }} onFinish={finish} />
      )}

      {phase === "result" && (
        <>
          <section className="result">
            <p className="big">{T.lesson.score(score, answers.length)}</p>
            {score < answers.length && <p className="muted">{T.lesson.mistakesBack}</p>}
          </section>
          {lesson.story && (
            <section className="story">
              <h2>{lesson.story.title}</h2>
              {lesson.story.long && <DepthSwitch which="storyDepth" />}
              <StoryBody story={lesson.story} />
            </section>
          )}
          <div className="row">
            <button onClick={() => go({ name: "home" })}>{T.lesson.toHome}</button>
            <button className="ghost" onClick={() => go({ name: "map" })}>{T.lesson.toMap}</button>
            {lesson.story && <button className="ghost" onClick={() => go({ name: "stories" })}>{T.lesson.allStories}</button>}
          </div>
        </>
      )}
      <SelectionMenu root={root} lessonId={lesson.id} />
    </article>
  );
}
