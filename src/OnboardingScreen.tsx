import { useState } from "react";
import { lang, T } from "../shared/i18n";
import { getLesson } from "../shared/lessons";
import type { Depth } from "../shared/types";
import { Markup } from "./Markup";
import { ReminderFields } from "./SettingsFields";
import { LangChoice } from "./SettingsScreen";
import { useApp } from "./state";
import { inTauri } from "./storage";
import { syncAnki } from "./system";
import { SyncSection } from "./SyncSection";

// на телефоне нет Anki и напоминаний — вместо них подключение к Mac
type Step = keyof typeof T.onboarding.steps;
const STEPS: Step[] = inTauri ? ["lang", "read", "anki", "reminder", "level"] : ["lang", "read", "sync", "level"];
// урок-образец для выбора подачи
const SAMPLE = "past-simple-basics";

function Preview({ which }: { which: "theoryDepth" | "storyDepth" }) {
  const { settings, setSettings } = useApp();
  const lesson = getLesson(SAMPLE)!;
  const block = lesson.theory[0]!;
  const story = lesson.story!;
  const text = (d: Depth) =>
    which === "theoryDepth"
      // в «подробно» показываем то, что добавляется, — иначе превью совпадают в начале
      ? d === "long" && block.more ? block.more : block.text
      : d === "long" && story.long ? story.long : story.text;
  return (
    <div className="preview" role="radiogroup" aria-label={which === "theoryDepth" ? T.onboarding.theoryDepth : T.onboarding.storyDepth}>
      {(["short", "long"] as const).map((d) => (
        <button key={d} role="radio" aria-checked={settings[which] === d} className={settings[which] === d ? "pick on" : "pick"} onClick={() => setSettings({ ...settings, [which]: d })}>
          <span className="pick-title">{d === "short" ? T.onboarding.short : which === "theoryDepth" ? T.onboarding.longTheory : T.onboarding.long}</span>
          <span className="pick-text reading"><Markup text={text(d)} /></span>
        </button>
      ))}
    </div>
  );
}

export function OnboardingScreen() {
  const { settings, setSettings, anki, setWords, progress, go } = useApp();
  const [step, setStep] = useState(0);
  const [ankiNote, setAnkiNote] = useState<string | null>(anki.words.length ? T.onboarding.deckNote(anki.deck, anki.words.length) : null);
  const [busy, setBusy] = useState(false);

  const done = (next: Parameters<typeof go>[0]) => {
    setSettings({ ...settings, lang: settings.lang ?? lang(), onboarded: true });
    go(next);
  };

  const readAnki = async () => {
    setBusy(true);
    try {
      const next = await syncAnki(settings);
      setWords(next);
      setAnkiNote(T.onboarding.deckRead(next.deck, next.words.length));
    } catch (e) {
      setAnkiNote(T.onboarding.ankiMissing(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="onboarding">
      <ol className="steps" aria-label={T.onboarding.stepsLabel}>
        {STEPS.map((s, i) => (
          <li key={s} className={i === step ? "current" : i < step ? "done" : undefined} aria-current={i === step ? "step" : undefined}>
              {T.onboarding.steps[s]}
          </li>
        ))}
      </ol>

      {STEPS[step] === "lang" && (
        <>
          <h1>{T.onboarding.langTitle}</h1>
          <p className="muted">{T.onboarding.langText}</p>
          <LangChoice />
        </>
      )}

      {STEPS[step] === "read" && (
        <>
          <h1>{T.onboarding.readTitle}</h1>
          <p className="muted">{T.onboarding.readText}</p>
          <h2>{T.onboarding.stories}</h2>
          <Preview which="storyDepth" />
          <h2>{T.onboarding.theory}</h2>
          <Preview which="theoryDepth" />
        </>
      )}

      {STEPS[step] === "anki" && (
        <>
          <h1>{T.onboarding.ankiTitle}</h1>
          <p>{T.onboarding.ankiText(settings.ankiDeck)}</p>
          <div className="row">
            <button disabled={busy} onClick={readAnki}>{busy ? T.onboarding.reading : T.onboarding.findDeck}</button>
          </div>
          {ankiNote && <p className="muted">{ankiNote}</p>}
        </>
      )}

      {STEPS[step] === "reminder" && (
        <>
          <h1>{T.onboarding.reminderTitle}</h1>
          <p>{T.onboarding.reminderText}</p>
          <ReminderFields />
        </>
      )}

      {STEPS[step] === "sync" && (
        <>
          <h1>{T.onboarding.syncTitle}</h1>
          <p>{T.onboarding.syncText}</p>
          <SyncSection />
        </>
      )}

      {STEPS[step] === "level" && (
        <>
          <h1>{T.onboarding.levelTitle}</h1>
          {progress.level ? (
            <>
              <p>{T.onboarding.levelKnown} <strong>{progress.level.value}</strong>.</p>
              <div className="row">
                <button onClick={() => done({ name: "home" })}>{T.onboarding.done}</button>
                <button className="ghost" onClick={() => done({ name: "test", kind: "placement" })}>{T.onboarding.retake}</button>
              </div>
            </>
          ) : (
            <>
              <p>{T.onboarding.levelText}</p>
              <div className="row">
                <button onClick={() => done({ name: "test", kind: "placement" })}>{T.onboarding.takeTest}</button>
                <button className="ghost" onClick={() => done({ name: "home" })}>{T.onboarding.startA1}</button>
              </div>
            </>
          )}
        </>
      )}

      <div className="row wizard-nav">
        {step > 0 && <button className="ghost" onClick={() => setStep(step - 1)}>{T.onboarding.back}</button>}
        {step < STEPS.length - 1 && <button onClick={() => setStep(step + 1)}>{T.onboarding.next}</button>}
        {step < STEPS.length - 1 && <button className="link" onClick={() => setStep(STEPS.length - 1)}>{T.onboarding.skip}</button>}
      </div>
    </article>
  );
}
