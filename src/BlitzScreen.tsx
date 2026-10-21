import { useEffect, useMemo, useRef, useState } from "react";
import { BLOCKS } from "../shared/lessons";
import { applyTest, blitzBest, blitzSet, BLITZ_MS, BLITZ_SIZE, testInput, type Answered } from "../shared/tests";
import type { TestResult } from "../shared/types";
import { useApp } from "./state";

// Блиц: только выбор, ответ клавишами 1–4 или кликом, без экрана «верно / неверно».
export function BlitzScreen({ blockId }: { blockId?: string }) {
  const { progress, record: log, go, setLeaveGuard } = useApp();
  const block = blockId ? BLOCKS.find((b) => b.id === blockId) : undefined;
  const [round, setRound] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questions = useMemo(() => blitzSet(progress, blockId), [round, blockId]);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [answers, setAnswers] = useState<Answered[]>([]);
  const [flash, setFlash] = useState<"ok" | "bad" | null>(null);
  const [result, setResult] = useState<{ r: TestResult; record: boolean; mistakes: Answered[] } | null>(null);
  const prevBest = useRef(blitzBest(progress, blockId));
  const reduced = useMemo(() => matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  const running = startedAt !== null && !result;
  const left = running ? Math.max(0, BLITZ_MS - (now - startedAt)) : BLITZ_MS;
  const q = questions[answers.length];

  const finish = (all: Answered[], at: number) => {
    const ms = Math.min(BLITZ_MS, at - (startedAt ?? at));
    // результат — из всех вопросов блица, а не только отвеченных
    const input = testInput("blitz", all, blockId, ms, BLITZ_SIZE);
    const e = log({ t: "test", ...input });
    const p = applyTest(progress, input, e.at);
    const r = p.tests[p.tests.length - 1]!;
    const best = prevBest.current;
    const record = !!all.length && (!best || r.correct > best.correct || (r.correct === best.correct && ms < (best.ms ?? Infinity)));
    setResult({ r, record, mistakes: all.filter((a) => !a.correct) });
  };

  useEffect(() => {
    setLeaveGuard(running ? "Прервать блиц? Результат не сохранится." : null);
    return () => setLeaveGuard(null);
  }, [running, setLeaveGuard]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setNow(Date.now()), reduced ? 1000 : 50);
    return () => clearInterval(id);
  }, [running, reduced]);

  useEffect(() => {
    if (running && left === 0) finish(answers, Date.now());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, running]);

  const answer = (i: number) => {
    if (!running || !q || q.ex.kind !== "choice") return;
    const correct = i === q.ex.answer;
    const all = [...answers, { ...q, correct, given: String(i) }];
    setAnswers(all);
    setFlash(correct ? "ok" : "bad");
    setTimeout(() => setFlash(null), 220);
    if (all.length >= questions.length) finish(all, Date.now());
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!running && !result && e.key === "Enter") return start();
      const n = Number(e.key);
      if (n >= 1 && n <= 9) { e.preventDefault(); answer(n - 1); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const start = () => {
    const t = Date.now();
    setAnswers([]);
    setResult(null);
    setStartedAt(t);
    setNow(t);
  };

  const again = () => {
    prevBest.current = blitzBest(progress, blockId);
    setRound((r) => r + 1);
    setStartedAt(null);
    setResult(null);
    setAnswers([]);
  };

  const title = block ? `Блиц: ${block.title}` : "Блиц";

  if (questions.length < 5) return (
    <article>
      <h1>{title}</h1>
      <p>Для блица пока мало вопросов. Пройди пару уроков — и возвращайся.</p>
      <button onClick={() => go({ name: "map" })}>К урокам</button>
    </article>
  );

  if (result) return (
    <article className="blitz-result">
      <p className={result.record ? "blitz-score gilt" : "blitz-score"}>{result.r.correct} из {result.r.total}</p>
      <p className="muted">
        {Math.round((result.r.ms ?? BLITZ_MS) / 1000)} сек.
        {result.record ? " Новый рекорд." : prevBest.current ? ` Рекорд: ${prevBest.current.correct} из ${prevBest.current.total}.` : ""}
      </p>
      {result.mistakes.length > 0 && (
        <section className="blitz-mistakes">
          <h2>Ошибки</h2>
          <ul className="lessons">
            {result.mistakes.map((m) => m.ex.kind === "choice" && (
              <li key={m.ex.id + m.lessonId}>
                <span className="wrap">{m.ex.prompt.replace("___", `[${m.ex.options[m.ex.answer]}]`)}</span>
              </li>
            ))}
          </ul>
          <p className="muted small">Ошибки добавлены в повторение.</p>
        </section>
      )}
      <div className="row center">
        <button onClick={again}>Ещё раз</button>
        <button className="ghost" onClick={() => go(block ? { name: "final", blockId: block.id } : { name: "home" })}>{block ? "К финалу блока" : "На главную"}</button>
      </div>
    </article>
  );

  if (!running) return (
    <article>
      <h1>{title}</h1>
      <p>{questions.length} вопросов с выбором ответа за 60 секунд. Отвечай клавишами 1–4 или кликом — следующий вопрос появится сразу.</p>
      {prevBest.current && <p className="gilt">Рекорд: {prevBest.current.correct} из {prevBest.current.total}</p>}
      <button autoFocus onClick={start}>Начать</button>
    </article>
  );

  return (
    <article className="blitz">
      <div className={`blitz-timer${left < 10_000 ? " late" : ""}${flash ? ` ${flash}` : ""}`} aria-hidden>
        <div style={{ width: `${(left / BLITZ_MS) * 100}%` }} />
      </div>
      <p className="muted small">{answers.length + 1} / {questions.length}</p>
      {q && q.ex.kind === "choice" && (
        <>
          <p className="blitz-prompt">{q.ex.prompt}</p>
          <div className="options">
            {q.ex.options.map((o, i) => (
              <button key={i} onClick={() => answer(i)}><span className="key" aria-hidden>{i + 1}</span>{o}</button>
            ))}
          </div>
        </>
      )}
    </article>
  );
}
