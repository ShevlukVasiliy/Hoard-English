import { useMemo, useState } from "react";
import { checkAnswer, correctAnswer } from "../shared/check";
import type { Exercise, OrderForm } from "../shared/types";
import { shuffle } from "../shared/random";
import { Inline } from "./Markup";

type Props = { ex: Exercise; onDone: (correct: boolean, given: string) => void };

// Показывает задание, после ответа — разбор и кнопку «Дальше».
export function ExerciseView({ ex, onDone }: Props) {
  const [given, setGiven] = useState<string | null>(null);
  const correct = given !== null && checkAnswer(ex, given);

  return (
    <div className="exercise">
      <Body ex={ex} locked={given !== null} onSubmit={setGiven} />
      {given !== null && (
        <div className={correct ? "verdict ok" : "verdict bad"}>
          <p>{correct ? "Верно" : <>Правильно: <strong>{correctAnswer(ex)}</strong></>}</p>
          {ex.explain && <p className="muted"><Inline text={ex.explain} /></p>}
          <button autoFocus onClick={() => onDone(correct, given)}>Дальше</button>
        </div>
      )}
    </div>
  );
}

function Body({ ex, locked, onSubmit }: { ex: Exercise; locked: boolean; onSubmit: (g: string) => void }) {
  switch (ex.kind) {
    case "choice":
      return <Choice ex={ex} locked={locked} onSubmit={onSubmit} />;
    case "order":
      return <Order ex={ex} locked={locked} onSubmit={onSubmit} />;
    case "gap":
      return (
        <>
          <p className="prompt"><Inline text={ex.prompt} /></p>
          {ex.hint && <p className="muted">{ex.hint}</p>}
          <TextAnswer locked={locked} onSubmit={onSubmit} placeholder="Что вместо ___?" />
        </>
      );
    case "fix":
      return (
        <>
          <p className="label">Исправь ошибку</p>
          <p className="prompt"><Inline text={ex.prompt} /></p>
          <TextAnswer locked={locked} onSubmit={onSubmit} initial={ex.prompt} />
        </>
      );
    case "transform":
      return (
        <>
          <p className="label">{ex.task}</p>
          <p className="prompt"><Inline text={ex.source} /></p>
          <TextAnswer locked={locked} onSubmit={onSubmit} />
        </>
      );
  }
}

function Choice({ ex, locked, onSubmit }: { ex: Extract<Exercise, { kind: "choice" }>; locked: boolean; onSubmit: (g: string) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <>
      <p className="prompt"><Inline text={ex.prompt} /></p>
      <div className="options">
        {ex.options.map((o, i) => (
          <button
            key={i}
            disabled={locked}
            className={locked ? (i === ex.answer ? "right" : i === picked ? "wrong" : "") : ""}
            onClick={() => { setPicked(i); onSubmit(String(i)); }}
          >
            {i < 9 && <span className="key" aria-hidden>{i + 1}</span>}
            {o}
          </button>
        ))}
      </div>
    </>
  );
}

function TextAnswer({ locked, onSubmit, initial = "", placeholder }: { locked: boolean; onSubmit: (g: string) => void; initial?: string; placeholder?: string }) {
  const [value, setValue] = useState(initial);
  return (
    <form className="answer" onSubmit={(e) => { e.preventDefault(); if (value.trim()) onSubmit(value); }}>
      <input autoFocus value={value} disabled={locked} placeholder={placeholder} spellCheck={false} autoCapitalize="off" autoCorrect="off" onChange={(e) => setValue(e.target.value)} />
      {!locked && <button type="submit" disabled={!value.trim()}>Проверить</button>}
    </form>
  );
}

const ORDER_TASK: Record<OrderForm, string> = {
  statement: "Собери утвердительное предложение",
  question: "Собери вопрос",
  negative: "Собери отрицание",
  phrase: "Собери фразу",
};
const ORDER_END: Record<OrderForm, string> = { statement: ".", question: "?", negative: ".", phrase: "" };

function Order({ ex, locked, onSubmit }: { ex: Extract<Exercise, { kind: "order" }>; locked: boolean; onSubmit: (g: string) => void }) {
  // индексы слов, чтобы повторяющиеся слова («were», «the») не путались
  const pool = useMemo(() => shuffle(ex.words.map((_, i) => i)), [ex]);
  const [chosen, setChosen] = useState<number[]>([]);
  const sentence = chosen.map((i) => ex.words[i]).join(" ");
  return (
    <>
      <p className="label">{ex.prompt ?? ORDER_TASK[ex.form]}</p>
      <p className="prompt built" title="Клик убирает последнее слово" onClick={() => !locked && setChosen(chosen.slice(0, -1))}>
        <span>{sentence || "…"}</span>
        {ORDER_END[ex.form] && <span className="built-end" aria-label="знак в конце">{ORDER_END[ex.form]}</span>}
      </p>
      <div className="options words">
        {pool.map((i) => (
          <button key={i} disabled={locked || chosen.includes(i)} onClick={() => setChosen([...chosen, i])}>{ex.words[i]}</button>
        ))}
      </div>
      {!locked && (
        <div className="row">
          <button className="ghost" disabled={!chosen.length} onClick={() => setChosen([])}>Сбросить</button>
          <button disabled={chosen.length !== ex.words.length} onClick={() => onSubmit(sentence)}>Проверить</button>
        </div>
      )}
    </>
  );
}
