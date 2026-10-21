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
      <span className="muted small">
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
      <h1>Уроки</h1>
      {BLOCKS.map((b) => {
        const s = blockStatus(p, b);
        return (
          <section key={b.id} className="block">
            <h2 className="block-head">
              <span>{b.title} <span className="muted small">{b.level}</span></span>
              <span className="muted small">{s.done} из {s.total}</span>
            </h2>
            <ul className="lessons">
              {blockLessons(b).map((l) => <Row key={l.id} l={l} />)}
              <li className="final-row">
                <span className="muted">Финал блока</span>
                <span>
                  <button className="link small" onClick={() => go({ name: "test", kind: "block", blockId: b.id })}>
                    Контрольная{s.passed ? " ✓" : ""}
                  </button>
                </span>
              </li>
            </ul>
          </section>
        );
      })}
    </>
  );
}
