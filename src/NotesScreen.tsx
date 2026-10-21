import { partOrder } from "../shared/highlights";
import { LESSONS } from "../shared/lessons";
import type { Highlight } from "../shared/types";
import { NOTES_DECK } from "../shared/types";
import { useApp } from "./state";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("ru", { day: "numeric", month: "long" });

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
        <h1>Заметки</h1>
        {fresh.length > 0 && (
          <button className="ghost small" onClick={async () => { for (const h of fresh) await sendNoteToAnki(h); }}>
            Отправить новые в Anki ({fresh.length})
          </button>
        )}
      </div>

      {!groups.length ? (
        <p className="muted">Выдели фрагмент в теории или истории и нажми «Сохранить» — он появится здесь.</p>
      ) : (
        <p className="muted small">Карточки уходят в колоду {NOTES_DECK}: на лицевой стороне фрагмент, на обороте урок.</p>
      )}

      {groups.map(({ lesson, notes }) => (
        <section key={lesson.id} className="notes-group">
          <h2>{lesson.title}</h2>
          {notes.map((h) => (
            <figure key={h.id} className="note">
              <blockquote>{h.text}</blockquote>
              <figcaption className="small">
                <span className="muted">{fmt(h.createdAt)}{h.part === "story" ? ", из истории" : h.part.startsWith("why") ? ", «Почему так?»" : ""}</span>
                <button className="link" onClick={() => open(h)}>Открыть в {h.part === "story" ? "истории" : "уроке"}</button>
                {h.ankiAt ? <span className="gilt">в Anki</span> : <button className="link" onClick={() => sendNoteToAnki(h)}>В Anki</button>}
                <button className="link danger" onClick={() => record({ t: "unhighlight", noteId: h.id })}>Убрать</button>
              </figcaption>
            </figure>
          ))}
        </section>
      ))}
    </>
  );
}
