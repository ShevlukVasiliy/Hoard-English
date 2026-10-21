import { useEffect, useMemo, useState } from "react";
import { fmtDateTime, T } from "../shared/i18n";
import { deckPractice, grammarInCards, problemCards, type DeckTask } from "../shared/anki";
import { getLesson } from "../shared/lessons";
import { suggestions } from "../shared/suggest";
import { Quiz, type QuizAnswer } from "./Quiz";
import { useApp } from "./state";
import { inTauri } from "./storage";
import { syncAnki } from "./system";

export function WordsScreen() {
  const { anki, setWords, flushAnki, queueWord, settings, progress, record, go } = useApp();
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [practice, setPractice] = useState<DeckTask[] | null>(null);
  const [result, setResult] = useState<QuizAnswer[] | null>(null);

  const grammar = useMemo(() => grammarInCards(anki.words), [anki.words]);
  const problems = useMemo(() => problemCards(anki.words), [anki.words]);
  const suggest = useMemo(() => suggestions(anki.words, progress.level?.value), [anki.words, progress.level]);
  const queued = new Set(anki.queue.map((q) => q.front));

  const sync = async () => {
    setBusy(true);
    setStatus(null);
    try {
      setWords(await syncAnki(settings));
      const sent = await flushAnki();
      if (sent) setStatus(T.words.fromQueue(sent));
    } catch (e) {
      setStatus(T.words.readFailed(e));
    } finally {
      setBusy(false);
    }
  };

  // при открытии экрана пробуем отправить очередь, если Anki уже запущен
  useEffect(() => {
    if (!anki.queue.length) return;
    flushAnki().then((sent) => { if (sent) setStatus(T.words.fromQueue(sent)); }, () => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const add = async (front: string, back: string) => {
    const r = await queueWord(front, back);
    setStatus(r === "sent" ? T.words.added(front) : inTauri ? T.words.queuedDesktop(front) : T.words.queuedPhone(front));
  };

  if (practice) {
    if (result) return (
      <article>
        <h1>{T.words.deckTasks}</h1>
        <p className="big">{T.words.score(result.filter((a) => a.correct).length, result.length)}</p>
        <div className="row">
          <button onClick={() => { setResult(null); setPractice(deckPractice(anki.words)); }}>{T.words.more}</button>
          <button className="ghost" onClick={() => { setResult(null); setPractice(null); }}>{T.words.back}</button>
        </div>
      </article>
    );
    return (
      <article>
        <h1>{T.words.deckTasks}</h1>
        <Quiz
          total={practice.length}
          next={(i) => practice[i] && { key: practice[i].ex.id, ex: practice[i].ex }}
          onFinish={(a) => { setResult(a); record({ t: "activity" }); }}
        />
      </article>
    );
  }

  return (
    <>
      <h1>{T.words.title}</h1>
      <section>
        <p className="muted">
          {anki.syncedAt
            ? T.words.deck(anki.deck, anki.words.length, fmtDateTime(anki.syncedAt))
            : inTauri ? T.words.notRead : T.words.fromMac}
        </p>
        <div className="row">
          {inTauri && <button disabled={busy} onClick={sync}>{busy ? T.words.reading : T.words.refresh}</button>}
          {anki.words.length > 0 && <button className="ghost" onClick={() => setPractice(deckPractice(anki.words))}>{T.words.practice}</button>}
        </div>
        {status && <p className="muted">{status}</p>}
      </section>

      {grammar.length > 0 && (
        <section>
          <h2>{T.words.grammar}</h2>
          {grammar.map((g) => (
            <div key={g.lessonId} className="grammar-group">
              <p>
                <button className="link" onClick={() => go({ name: "lesson", id: g.lessonId })}>{T.anki.labels[g.lessonId] ?? g.label}</button>{" "}
                <span className="muted small">{getLesson(g.lessonId)?.title} · {g.examples.length}</span>
              </p>
              <ul className="examples">
                {g.examples.slice(0, 3).map((e) => <li key={e.front}><span className="en">{e.front}</span><span className="ru">{e.back}</span></li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {problems.length > 0 && (
        <section>
          <h2>{T.words.hard}</h2>
          <p className="muted small">{T.words.hardHint}</p>
          <ul className="lessons">
            {problems.map((w) => <li key={w.front}><span>{w.front}</span><span className="muted">{w.back.slice(0, 40)} · {T.words.lapses(w.lapses)}</span></li>)}
          </ul>
        </section>
      )}

      <section>
        <h2>{T.words.fresh}</h2>
        <p className="muted small">{T.words.freshHint}</p>
        <ul className="lessons">
          {suggest.map((s) => (
            <li key={s.word}>
              <span><strong>{s.word}</strong> <span className="muted small">{s.example}</span></span>
              {queued.has(s.word) ? <span className="muted small">{T.words.queued}</span> : <button className="ghost small" onClick={() => add(s.word, s.example)}>{T.words.toAnki}</button>}
            </li>
          ))}
        </ul>
        {anki.queue.length > 0 && <p className="muted small">{T.words.inQueue(anki.queue.length)} {inTauri ? T.words.queueDesktop : T.words.queuePhone}</p>}
      </section>
    </>
  );
}
