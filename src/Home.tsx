import { BLOCKS, LESSONS } from "../shared/lessons";
import { dueReviews } from "../shared/progress";
import { blockStatus, currentBlock, recommendations, weekStreak } from "../shared/stats";
import { blitzBest, monthlyDue } from "../shared/tests";
import { T } from "../shared/i18n";
import { useApp } from "./state";

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
    p.level ? T.home.level(p.level.value) : null,
    streak ? T.home.streak(streak) : null,
    block && bs ? T.home.block(block.title, bs.done, bs.total) : null,
    T.home.closed(BLOCKS.filter((b) => blockStatus(p, b).passed).length, BLOCKS.length),
  ].filter(Boolean).join(" ");

  return (
    <>
      <h1 className="home-title">Hoard</h1>

      {!p.level ? (
        <section className="next">
          <p className="label">{T.home.first}</p>
          <button className="next-title" onClick={() => go({ name: "test", kind: "placement" })}>{T.home.placement}</button>
          <p className="muted">{T.home.placementHint}</p>
        </section>
      ) : block && bs?.ready && !bs.passed ? (
        <section className="next">
          <p className="label">{T.home.next}</p>
          <button className="next-title" onClick={() => go({ name: "final", blockId: block.id })}>{T.home.final(block.title)}</button>
          <p className="muted">{T.home.finalHint}</p>
        </section>
      ) : next ? (
        <section className="next">
          <p className="label">{p.lessons[next.id] ? T.home.repeat : T.home.next}</p>
          <button className="next-title" onClick={() => go({ name: "lesson", id: next.id })}>{next.title}</button>
          <p className="muted">{next.subtitle}. {next.level}</p>
        </section>
      ) : null}

      <ul className="quiet">
        {due > 0 && (
          <li>
            <span>{T.home.due(due)}</span>
            <button className="ghost small" onClick={() => go({ name: "review" })}>{T.home.repeat}</button>
          </li>
        )}
        {monthlyDue(p) && (
          <li>
            <span>{T.home.monthly}</span>
            <button className="ghost small" onClick={() => go({ name: "test", kind: "monthly" })}>{T.home.checkLevel}</button>
          </li>
        )}
        <li>
          <span>{T.home.blitz}{best ? <>, <span className="gilt">{T.home.blitzBest(best.correct, best.total)}</span></> : ""}</span>
          <button className="ghost small" onClick={() => go({ name: "blitz" })}>{T.home.start}</button>
        </li>
        {recs.slice(1).map((l) => (
          <li key={l.id}>
            <button className="link" onClick={() => go({ name: "lesson", id: l.id })}>{l.title}</button>
            <span className="muted small">{p.lessons[l.id] ? T.home.repeatSmall : l.subtitle}</span>
          </li>
        ))}
      </ul>

      {today?.story && (
        <section className="today">
          <p className="label">{T.home.today}</p>
          <h2><button className="link story-link" onClick={() => go({ name: "story", id: today.id })}>{today.story.title}</button></h2>
          <p className="reading today-text">{plain(today.story.text, 220)}</p>
          <button className="link" onClick={() => go({ name: "story", id: today.id })}>{T.home.read}</button>
        </section>
      )}

      <p className="status-line">{status}</p>
    </>
  );
}
