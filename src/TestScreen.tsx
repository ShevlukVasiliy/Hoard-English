import { useMemo, useState } from "react";
import { T } from "../shared/i18n";
import { BLOCKS } from "../shared/lessons";
import { Placement, applyTest, blockTest, monthlyTest, testInput, trapsTest, type Answered, type Question } from "../shared/tests";
import { BLOCK_PASS_RATIO, type TestResult } from "../shared/types";
import { Quiz } from "./Quiz";
import { useApp, type Route } from "./state";

export function TestScreen({ route }: { route: Extract<Route, { name: "test" }> }) {
  const { progress, record, go } = useApp();
  const block = route.kind === "block" || route.kind === "traps" ? BLOCKS.find((b) => b.id === route.blockId) : undefined;
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  // входной тест адаптивный, остальные — фиксированный набор
  const placement = useMemo(() => (route.kind === "placement" ? new Placement() : null), [route.kind]);
  const fixed = useMemo<Question[]>(() => {
    if (route.kind === "block") return blockTest(route.blockId);
    if (route.kind === "traps") return trapsTest(route.blockId);
    if (route.kind === "monthly") return monthlyTest(progress.level?.value ?? "A2");
    return [];
  }, [route]);
  const asked = useMemo<Question[]>(() => [], []);
  const total = placement ? placement.size : fixed.length;

  const next = (i: number) => {
    const q = placement ? placement.next() : fixed[i];
    if (!q) return undefined;
    asked[i] = q;
    return { key: `${q.lessonId}/${q.ex.id}`, ex: q.ex };
  };

  const finish = (answers: { correct: boolean; given: string }[]) => {
    const all: Answered[] = placement ? placement.answers : answers.map((a, i) => ({ ...asked[i]!, ...a }));
    const input = testInput(route.kind, all, block?.id);
    const e = record({ t: "test", ...input });
    const p = applyTest(progress, input, e.at);
    setResult(p.tests[p.tests.length - 1]!);
  };

  const title = `${T.test.titles[route.kind]}${block ? ` · ${block.title}` : ""}`;

  if (result) {
    const ratio = result.correct / result.total;
    const weak = Object.entries(result.byTopic).filter(([, t]) => t.correct / t.total < 0.6).map(([k]) => k);
    return (
      <article>
        <h1>{title}</h1>
        <p className="big">{T.test.score(result.correct, result.total)}</p>
        {result.level && <p>{T.test.level} <strong>{result.level}</strong></p>}
        {route.kind === "block" && (
          <p>{ratio >= BLOCK_PASS_RATIO ? T.test.passed : T.test.needed(Math.round(BLOCK_PASS_RATIO * 100))}</p>
        )}
        {route.kind === "traps" && <p>{ratio >= BLOCK_PASS_RATIO ? T.test.trapsPassed : T.test.trapsFailed}</p>}
        {weak.length > 0 && <p className="muted">{T.test.weak(weak.join(", "))}</p>}
        <p className="muted">{T.test.mistakesAdded}</p>
        <div className="row">
          {block ? <button onClick={() => go({ name: "final", blockId: block.id })}>{T.test.toFinal}</button> : <button onClick={() => go({ name: "home" })}>{T.test.toHome}</button>}
        </div>
      </article>
    );
  }

  return (
    <article>
      <h1>{title}</h1>
      {!started ? (
        <>
          <p>
            {route.kind === "placement" && T.test.intro.placement}
            {route.kind === "block" && T.test.intro.block(Math.round(BLOCK_PASS_RATIO * 100))}
            {route.kind === "traps" && T.test.intro.traps}
            {route.kind === "monthly" && T.test.intro.monthly}
          </p>
          <button onClick={() => setStarted(true)}>{T.test.start}</button>
        </>
      ) : (
        <Quiz
          total={total}
          next={next}
          onAnswer={(i, a) => placement?.answer(asked[i]!, a.correct, a.given)}
          onFinish={finish}
          openEnded={!!placement}
        />
      )}
    </article>
  );
}
