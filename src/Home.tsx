import { BLOCKS, LESSONS } from "../shared/lessons";
import { dueReviews } from "../shared/progress";
import { blockStatus, currentBlock, recommendations, weekStreak } from "../shared/stats";
import { blitzBest, monthlyDue } from "../shared/tests";
import { useApp } from "./state";

export const plural = (n: number, one: string, few: string, many: string) =>
  n % 10 === 1 && n % 100 !== 11 ? one : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? few : many;

// Без разметки и обрезано по слову — для анонса.
const plain = (md: string, n: number) => {
  const t = md.replace(/\*\*|`|\*/g, "").replace(/\s+/g, " ").trim();
  return t.length <= n ? t : `${t.slice(0, t.lastIndexOf(" ", n))}…`;
};

export function Home() {
  const { progress: p, go } = useApp();
  const due = dueReviews(p).length;
  const streak = weekStreak(p.activity);
  const recs = recommendations(p);
  const block = currentBlock(p);
  const bs = block && blockStatus(p, block);
  const next = recs[0];
  const best = blitzBest(p);
  // история дня — одна из открытых, меняется раз в сутки
  const opened = LESSONS.filter((l) => l.story && p.stories.includes(l.id));
  const today = opened[Math.floor(Date.now() / 86_400_000) % Math.max(1, opened.length)];

  const status = [
    p.level ? `Уровень ${p.level.value}.` : null,
    streak ? `Серия: ${streak} ${plural(streak, "неделя", "недели", "недель")} подряд.` : null,
    block && bs ? `Блок «${block.title}»: ${bs.done} из ${bs.total}.` : null,
    `Закрыто блоков: ${BLOCKS.filter((b) => blockStatus(p, b).passed).length} из ${BLOCKS.length}.`,
  ].filter(Boolean).join(" ");

  return (
    <>
      <h1 className="home-title">Hoard</h1>

      {!p.level ? (
        <section className="next">
          <p className="label">Сначала</p>
          <button className="next-title" onClick={() => go({ name: "test", kind: "placement" })}>Входной тест</button>
          <p className="muted">Обычно 20–25 вопросов. По нему подберём уроки.</p>
        </section>
      ) : block && bs?.ready && !bs.passed ? (
        <section className="next">
          <p className="label">Дальше</p>
          <button className="next-title" onClick={() => go({ name: "final", blockId: block.id })}>Финал блока «{block.title}»</button>
          <p className="muted">Все уроки блока пройдены. Контрольная, ловушки и блиц по блоку.</p>
        </section>
      ) : next ? (
        <section className="next">
          <p className="label">{p.lessons[next.id] ? "Повторить" : "Дальше"}</p>
          <button className="next-title" onClick={() => go({ name: "lesson", id: next.id })}>{next.title}</button>
          <p className="muted">{next.subtitle}. {next.level}</p>
        </section>
      ) : null}

      <ul className="quiet">
        {due > 0 && (
          <li>
            <span>{due} {plural(due, "ошибка ждёт", "ошибки ждут", "ошибок ждут")} повторения</span>
            <button className="ghost small" onClick={() => go({ name: "review" })}>Повторить</button>
          </li>
        )}
        {monthlyDue(p) && (
          <li>
            <span>Прошёл месяц с последней проверки уровня</span>
            <button className="ghost small" onClick={() => go({ name: "test", kind: "monthly" })}>Проверить уровень</button>
          </li>
        )}
        <li>
          <span>Блиц: 15 вопросов за минуту{best ? <>, <span className="gilt">рекорд {best.correct} из {best.total}</span></> : ""}</span>
          <button className="ghost small" onClick={() => go({ name: "blitz" })}>Начать</button>
        </li>
        {recs.slice(1).map((l) => (
          <li key={l.id}>
            <button className="link" onClick={() => go({ name: "lesson", id: l.id })}>{l.title}</button>
            <span className="muted small">{p.lessons[l.id] ? "повторить" : l.subtitle}</span>
          </li>
        ))}
      </ul>

      {today?.story && (
        <section className="today">
          <p className="label">История дня</p>
          <h2><button className="link story-link" onClick={() => go({ name: "story", id: today.id })}>{today.story.title}</button></h2>
          <p className="reading today-text">{plain(today.story.text, 220)}</p>
          <button className="link" onClick={() => go({ name: "story", id: today.id })}>Читать</button>
        </section>
      )}

      <p className="status-line">{status}</p>
    </>
  );
}
