import { BLOCKS } from "../shared/lessons";
import { dueReviews } from "../shared/progress";
import { blockStatus, currentBlock, recommendations, weekStreak } from "../shared/stats";
import { monthlyDue } from "../shared/tests";
import { useApp } from "./state";

const weeks = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? "неделя" : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? "недели" : "недель");

export function Home() {
  const { progress: p, go } = useApp();
  const due = dueReviews(p).length;
  const streak = weekStreak(p.activity);
  const recs = recommendations(p);
  const block = currentBlock(p);
  const bs = block && blockStatus(p, block);

  return (
    <>
      <h1>Grammar</h1>

      <section className="cards">
        <div className="card">
          <p className="label">Уровень</p>
          {p.level ? (
            <p className="big">{p.level.value}</p>
          ) : (
            <button onClick={() => go({ name: "test", kind: "placement" })}>Пройти входной тест</button>
          )}
        </div>
        <div className="card">
          <p className="label">Серия</p>
          <p className="big">{streak} <span className="muted small">{weeks(streak)}</span></p>
        </div>
        <div className="card">
          <p className="label">На повтор</p>
          <p className="big">{due}</p>
        </div>
      </section>

      {due > 0 && (
        <section className="callout">
          <p>Накопилось ошибок на повтор: <strong>{due}</strong>.</p>
          <button onClick={() => go({ name: "review" })}>Повторить ошибки</button>
        </section>
      )}

      {block && bs?.ready && !bs.passed && (
        <section className="callout">
          <p>Блок «{block.title}» пройден. Контрольная: 15 вопросов, нужно 80%.</p>
          <button onClick={() => go({ name: "test", kind: "block", blockId: block.id })}>Начать контрольную</button>
        </section>
      )}

      {monthlyDue(p) && (
        <section className="callout">
          <p>Прошёл месяц с последней проверки уровня.</p>
          <button className="ghost" onClick={() => go({ name: "test", kind: "monthly" })}>Проверить уровень</button>
        </section>
      )}

      {recs.length > 0 && (
        <section>
          <h2>Дальше</h2>
          <ul className="lessons">
            {recs.map((l, i) => (
              <li key={l.id}>
                <button className={i === 0 ? "" : "link"} onClick={() => go({ name: "lesson", id: l.id })}>{l.title}</button>
                <span className="muted">{l.level} · {p.lessons[l.id] ? "повторить" : l.subtitle}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {block && bs && (
        <p className="muted">Блок «{block.title}»: {bs.done} из {bs.total} уроков · всего блоков закрыто {BLOCKS.filter((b) => blockStatus(p, b).passed).length} из {BLOCKS.length}</p>
      )}

    </>
  );
}
