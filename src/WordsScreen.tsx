import { useEffect, useMemo, useState } from "react";
import { deckPractice, grammarInCards, problemCards, type DeckTask } from "../shared/anki";
import { getLesson } from "../shared/lessons";
import { suggestions } from "../shared/suggest";
import { Quiz, type QuizAnswer } from "./Quiz";
import { useApp } from "./state";
import { addToAnki, flushQueue, syncAnki } from "./system";

export function WordsScreen() {
  const { anki, setAnki, settings, progress, setProgress, go } = useApp();
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
      let next = await syncAnki(settings, anki);
      if (next.queue.length) {
        const r = await flushQueue(settings.ankiDeck, next);
        next = r.cache;
        if (r.sent) setStatus(`Добавлено из очереди: ${r.sent}`);
      }
      setAnki(next);
    } catch (e) {
      setStatus(`Не удалось прочитать Anki: ${e}`);
    } finally {
      setBusy(false);
    }
  };

  // при открытии экрана пробуем отправить очередь, если Anki уже запущен
  useEffect(() => {
    if (!anki.queue.length) return;
    flushQueue(settings.ankiDeck, anki).then((r) => { if (r.sent) { setAnki(r.cache); setStatus(`Добавлено из очереди: ${r.sent}`); } }, () => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const add = async (front: string, back: string) => {
    try {
      await addToAnki(settings.ankiDeck, { front, back });
      setStatus(`«${front}» добавлено в Anki`);
    } catch (e) {
      setAnki({ ...anki, queue: [...anki.queue, { front, back, source: "lesson", addedAt: new Date().toISOString() }] });
      setStatus(`Anki недоступен (${e}). «${front}» в очереди, добавится позже.`);
    }
  };

  if (practice) {
    if (result) return (
      <article>
        <h1>Задания из колоды</h1>
        <p className="big">{result.filter((a) => a.correct).length} из {result.length}</p>
        <div className="row">
          <button onClick={() => { setResult(null); setPractice(deckPractice(anki.words)); }}>Ещё</button>
          <button className="ghost" onClick={() => { setResult(null); setPractice(null); }}>Назад</button>
        </div>
      </article>
    );
    return (
      <article>
        <h1>Задания из колоды</h1>
        <Quiz
          total={practice.length}
          next={(i) => practice[i] && { key: practice[i].ex.id, ex: practice[i].ex }}
          onFinish={(a) => { setResult(a); setProgress({ ...progress, activity: [...progress.activity, new Date().toISOString()] }); }}
        />
      </article>
    );
  }

  return (
    <>
      <h1>Слова</h1>
      <section>
        <p className="muted">
          {anki.syncedAt
            ? `Колода «${anki.deck}»: ${anki.words.length} карточек · обновлено ${new Date(anki.syncedAt).toLocaleString("ru")}`
            : "Колода ещё не прочитана. Anki открывается только на чтение."}
        </p>
        <div className="row">
          <button disabled={busy} onClick={sync}>{busy ? "Читаю…" : "Обновить из Anki"}</button>
          {anki.words.length > 0 && <button className="ghost" onClick={() => setPractice(deckPractice(anki.words))}>Задания из моих карточек</button>}
        </div>
        {status && <p className="muted">{status}</p>}
      </section>

      {grammar.length > 0 && (
        <section>
          <h2>Твоя грамматика в твоих карточках</h2>
          {grammar.map((g) => (
            <div key={g.lessonId} className="grammar-group">
              <p>
                <button className="link" onClick={() => go({ name: "lesson", id: g.lessonId })}>{g.label}</button>{" "}
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
          <h2>Трудные слова</h2>
          <p className="muted small">Чаще всего ошибки в Anki — они чаще попадаются в заданиях.</p>
          <ul className="lessons">
            {problems.map((w) => <li key={w.front}><span>{w.front}</span><span className="muted">{w.back.slice(0, 40)} · ошибок {w.lapses}</span></li>)}
          </ul>
        </section>
      )}

      <section>
        <h2>Новые слова</h2>
        <p className="muted small">Слова из уроков и из списка CEFR-J твоего уровня, которых нет в колоде. В карточку попадёт пример из урока или часть речи — перевод можно дописать в Anki.</p>
        <ul className="lessons">
          {suggest.map((s) => (
            <li key={s.word}>
              <span><strong>{s.word}</strong> <span className="muted small">{s.example}</span></span>
              {queued.has(s.word) ? <span className="muted small">в очереди</span> : <button className="ghost small" onClick={() => add(s.word, s.example)}>В Anki</button>}
            </li>
          ))}
        </ul>
        {anki.queue.length > 0 && <p className="muted small">В очереди: {anki.queue.length}. Добавятся, когда Anki будет запущен.</p>}
      </section>
    </>
  );
}
