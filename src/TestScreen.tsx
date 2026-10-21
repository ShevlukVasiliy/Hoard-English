import { useMemo, useState } from "react";
import { BLOCKS } from "../shared/lessons";
import { Placement, blockTest, monthlyTest, recordTest, trapsTest, type Answered, type Question } from "../shared/tests";
import { BLOCK_PASS_RATIO, type TestResult } from "../shared/types";
import { Quiz } from "./Quiz";
import { useApp, type Route } from "./state";

const TITLES = { placement: "Входной тест", monthly: "Проверка уровня", block: "Контрольная", traps: "Ловушки" };

export function TestScreen({ route }: { route: Extract<Route, { name: "test" }> }) {
  const { progress, setProgress, go } = useApp();
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
    const p = recordTest(progress, route.kind, all, block?.id);
    setProgress(p);
    setResult(p.tests[p.tests.length - 1]!);
  };

  const title = `${TITLES[route.kind]}${block ? ` · ${block.title}` : ""}`;

  if (result) {
    const ratio = result.correct / result.total;
    const weak = Object.entries(result.byTopic).filter(([, t]) => t.correct / t.total < 0.6).map(([k]) => k);
    return (
      <article>
        <h1>{title}</h1>
        <p className="big">{result.correct} из {result.total}</p>
        {result.level && <p>Уровень по тесту: <strong>{result.level}</strong></p>}
        {route.kind === "block" && (
          <p>{ratio >= BLOCK_PASS_RATIO ? "Контрольная сдана, блок закрыт." : `Для зачёта нужно ${Math.round(BLOCK_PASS_RATIO * 100)}%. Повтори уроки блока и попробуй ещё раз.`}</p>
        )}
        {route.kind === "traps" && <p>{ratio >= BLOCK_PASS_RATIO ? "Ловушки пройдены." : "Ловушки сложнее контрольной — ошибки вернутся на повторение."}</p>}
        {weak.length > 0 && <p className="muted">Слабые темы: {weak.join(", ")}. Они попадут в рекомендации.</p>}
        <p className="muted">Ошибки добавлены в повторение.</p>
        <div className="row">
          {block ? <button onClick={() => go({ name: "final", blockId: block.id })}>К финалу блока</button> : <button onClick={() => go({ name: "home" })}>На главную</button>}
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
            {route.kind === "placement" && "Обычно 20–25 вопросов на разные темы. Сложность подстраивается под ответы, тест заканчивается, когда уровень ясен. Если не знаешь — лучше ответь наугад, чем бросить."}
            {route.kind === "block" && `15 вопросов по всем урокам блока. Засчитывается от ${Math.round(BLOCK_PASS_RATIO * 100)}%.`}
            {route.kind === "traps" && "12 заданий: похожие конструкции рядом и поиск ошибок. Сложнее контрольной."}
            {route.kind === "monthly" && "20 вопросов твоего уровня и соседних. По результату уровень пересчитается."}
          </p>
          <button onClick={() => setStarted(true)}>Начать</button>
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
