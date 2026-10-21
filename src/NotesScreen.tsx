import { partOrder } from "../shared/highlights";
import { fmtDate, T } from "../shared/i18n";
import { LESSONS } from "../shared/lessons";
import type { Highlight } from "../shared/types";
import { NOTES_DECK } from "../shared/types";
import { useApp } from "./state";

export function NotesScreen() {
  const { highlights, record, sendNoteToAnki, go } = useApp();
  const items = highlights.items;
  const fresh = items.filter((h) => !h.ankiAt);
  // уроки в порядке курса, фрагменты — по месту в тексте
  const groups = LESSONS.map((l) => ({
    lesson: l,
    notes: items.filter((h) => h.lessonId === l.id).sort((a, b) => partOrder(a.part) - partOrder(b.part) || a.start - b.start),
  })).filter((g) => g.notes.length);

  const open = (h: Highlight) =>
    go(h.part === "story" ? { name: "story", id: h.lessonId, focus: h.id } : { name: "lesson", id: h.lessonId, focus: h.id });

  return (
    <>
      <div className="title-row">
        <h1>{T.notes.title}</h1>
        {fresh.length > 0 && (
          <button className="ghost small" onClick={async () => { for (const h of fresh) await sendNoteToAnki(h); }}>
            {T.notes.sendNew(fresh.length)}
          </button>
        )}
      </div>

      {!groups.length ? (
        <p className="muted">{T.notes.empty}</p>
      ) : (
        <p className="muted small">{T.notes.deckHint(NOTES_DECK)}</p>
      )}

      {groups.map(({ lesson, notes }) => (
        <section key={lesson.id} className="notes-group">
          <h2>{lesson.title}</h2>
          {notes.map((h) => (
            <figure key={h.id} className="note">
              <blockquote>{h.text}</blockquote>
              <figcaption className="small">
                <span className="muted">{fmtDate(h.createdAt)}{h.part === "story" ? T.notes.fromStory : h.part.startsWith("why") ? T.notes.fromWhy : ""}</span>
                <button className="link" onClick={() => open(h)}>{h.part === "story" ? T.notes.openStory : T.notes.openLesson}</button>
                {h.ankiAt ? <span className="gilt">{T.notes.inAnki}</span> : <button className="link" onClick={() => sendNoteToAnki(h)}>{T.notes.toAnki}</button>}
                <button className="link danger" onClick={() => record({ t: "unhighlight", noteId: h.id })}>{T.notes.remove}</button>
              </figcaption>
            </figure>
          ))}
        </section>
      ))}
    </>
  );
}
