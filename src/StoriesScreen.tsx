import { useEffect, useRef } from "react";
import { blockOf, BLOCKS, LESSONS } from "../shared/lessons";
import { ERA_INFO } from "../shared/lessons/story-meta";
import { ERAS } from "../shared/types";
import { flashHighlight, SelectionMenu, useSavedPaint } from "./Highlights";
import { DepthSwitch, StoryBody } from "./LessonScreen";
import { useApp } from "./state";

// Открытые истории: прочитанные после урока.
export const storyOpen = (opened: string[], lessonId: string) => opened.includes(lessonId);

export function StoriesScreen() {
  const { progress: p, go, sendStoriesToAnki } = useApp();
  // в порядке курса
  const order = BLOCKS.flatMap((b) => b.lessonIds);
  const withStory = LESSONS.filter((l) => l.story).sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  const open = withStory.filter((l) => storyOpen(p.stories, l.id));
  const notSent = open.filter((l) => !(p.storiesInAnki ?? []).includes(l.id));

  return (
    <>
      <h1>История языка</h1>
      <p className="muted">
        Почему английский устроен так, а не иначе. История открывается, когда проходишь её урок. Открыто {open.length} из {withStory.length}.
      </p>
      {notSent.length > 0 && (
        <div className="row">
          <button className="ghost small" onClick={() => sendStoriesToAnki(notSent)}>Добавить открытые истории в Anki ({notSent.length})</button>
        </div>
      )}

      {ERAS.map((era) => {
        const info = ERA_INFO[era];
        const list = withStory.filter((l) => l.story!.era === era);
        if (!list.length) return null;
        return (
          <section key={era} className="era">
            <div className="era-years">{info.years}</div>
            <div className="era-body">
              <h2>{info.title}</h2>
              <p className="era-line" title={info.source}>{info.line}</p>
              <p className="era-source">{info.source}</p>
              <ul className="era-stories">
                {list.map((l) => storyOpen(p.stories, l.id) ? (
                  <li key={l.id}>
                    <button className="link story-link" onClick={() => go({ name: "story", id: l.id })}>{l.story!.title}</button>
                    <span className="muted small">{l.story!.takeaway}</span>
                  </li>
                ) : (
                  <li key={l.id} className="closed">
                    <span className="story-link">{l.story!.title}</span>
                    <span className="muted small">
                      Откроется после урока <button className="link" onClick={() => go({ name: "lesson", id: l.id })}>«{l.title}»</button>
                      {blockOf(l.id) ? ` из блока «${blockOf(l.id)!.title}»` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </>
  );
}

export function StoryScreen({ id, focus }: { id: string; focus?: string }) {
  const { progress: p, go, settings, highlights } = useApp();
  const lesson = LESSONS.find((l) => l.id === id);
  const root = useRef<HTMLElement>(null);
  useSavedPaint(root, id, [settings.storyDepth]);
  // переход из «Заметок» к фрагменту
  useEffect(() => {
    const h = focus && highlights.items.find((x) => x.id === focus);
    if (h) requestAnimationFrame(() => root.current && flashHighlight(root.current, h));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);
  if (!lesson?.story) return null;
  const story = lesson.story;
  const info = ERA_INFO[story.era];

  if (!storyOpen(p.stories, id)) return (
    <article>
      <h1>{story.title}</h1>
      <p>Эта история откроется после урока «{lesson.title}».</p>
      <button onClick={() => go({ name: "lesson", id })}>К уроку</button>
    </article>
  );

  return (
    <article className="lesson" ref={root}>
      <header className="lesson-head">
        <p className="label">{info.title}, {info.years}</p>
        <h1>{story.title}</h1>
      </header>
      {story.long && <DepthSwitch which="storyDepth" />}
      <StoryBody story={story} />
      <div className="row">
        <button className="ghost" onClick={() => go({ name: "lesson", id })}>Урок «{lesson.title}»</button>
        <button className="ghost" onClick={() => go({ name: "stories" })}>Все истории</button>
      </div>
      <SelectionMenu root={root} lessonId={id} />
    </article>
  );
}
