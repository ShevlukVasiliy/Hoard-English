import { BLOCKS, blockLessons } from "../shared/lessons";
import { blockStatus, isRecommended, mastery } from "../shared/stats";
import type { Lesson } from "../shared/types";
import { useApp } from "./state";

function Row({ l }: { l: Lesson }) {
  const { progress: p, go } = useApp();
  const done = p.lessons[l.id];
  const m = mastery(p, l.topic);
  return (
    <li>
      <button className="link" onClick={() => go({ name: "lesson", id: l.id })}>
        {done ? "✓ " : ""}{l.title}
      </button>
      <span className="muted">
        {isRecommended(p, l) && <span className="tag">рекомендуем</span>}
        {done ? `${done.score}/${done.total}` : l.level}
        {m !== undefined && <span className="meter" title={`Освоенность темы ${Math.round(m * 100)}%`}><span style={{ width: `${m * 100}%` }} /></span>}
      </span>
    </li>
  );
}

export function MapScreen() {
  const { progress: p, go } = useApp();
  return (
    <>
      <h1>Карта уроков</h1>
      {BLOCKS.map((b) => {
        const s = blockStatus(p, b);
        return (
          <section key={b.id}>
            <h2>
              {b.title} <span className="muted small">{b.level} · {s.passed ? "контрольная сдана" : `${s.done}/${s.total}`}</span>
            </h2>
            <ul className="lessons">{blockLessons(b).map((l) => <Row key={l.id} l={l} />)}</ul>
            {s.ready && !s.passed && (
              <button className="ghost small" onClick={() => go({ name: "test", kind: "block", blockId: b.id })}>Контрольная по блоку</button>
            )}
          </section>
        );
      })}
    </>
  );
}
