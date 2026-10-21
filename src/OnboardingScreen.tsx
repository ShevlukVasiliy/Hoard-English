import { useState } from "react";
import { getLesson } from "../shared/lessons";
import type { Depth } from "../shared/types";
import { Markup } from "./Markup";
import { ReminderFields } from "./SettingsFields";
import { useApp } from "./state";
import { inTauri } from "./storage";
import { syncAnki } from "./system";
import { SyncSection } from "./SyncSection";

// на телефоне нет Anki и напоминаний — вместо них подключение к Mac
const STEPS = inTauri ? ["Как читать", "Anki", "Напоминание", "Уровень"] : ["Как читать", "Синхронизация", "Уровень"];
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
    <div className="preview" role="radiogroup" aria-label={which === "theoryDepth" ? "Подача теории" : "Длина историй"}>
      {(["short", "long"] as const).map((d) => (
        <button key={d} role="radio" aria-checked={settings[which] === d} className={settings[which] === d ? "pick on" : "pick"} onClick={() => setSettings({ ...settings, [which]: d })}>
          <span className="pick-title">{d === "short" ? "Кратко" : which === "theoryDepth" ? "Подробно: ещё и это" : "Подробно"}</span>
          <span className="pick-text reading"><Markup text={text(d)} /></span>
        </button>
      ))}
    </div>
  );
}

export function OnboardingScreen() {
  const { settings, setSettings, anki, setWords, progress, go } = useApp();
  const [step, setStep] = useState(0);
  const [ankiNote, setAnkiNote] = useState<string | null>(anki.words.length ? `Колода «${anki.deck}»: ${anki.words.length} карточек.` : null);
  const [busy, setBusy] = useState(false);

  const done = (next: Parameters<typeof go>[0]) => {
    setSettings({ ...settings, onboarded: true });
    go(next);
  };

  const readAnki = async () => {
    setBusy(true);
    try {
      const next = await syncAnki(settings);
      setWords(next);
      setAnkiNote(`Колода «${next.deck}»: ${next.words.length} карточек. Из них будут задания и примеры.`);
    } catch (e) {
      setAnkiNote(`Anki не найден (${e}). Можно подключить позже в настройках.`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="onboarding">
      <ol className="steps" aria-label="Шаги настройки">
        {STEPS.map((s, i) => (
          <li key={s} className={i === step ? "current" : i < step ? "done" : undefined} aria-current={i === step ? "step" : undefined}>
              {s}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <>
          <h1>Как тебе удобнее читать?</h1>
          <p className="muted">Hoard объясняет грамматику вместе с историей языка. Выбери подачу — её можно поменять в любом уроке.</p>
          <h2>Истории про язык</h2>
          <Preview which="storyDepth" />
          <h2>Теория</h2>
          <Preview which="theoryDepth" />
        </>
      )}

      {STEPS[step] === "Anki" && (
        <>
          <h1>Колода Anki</h1>
          <p>Hoard читает колоду «{settings.ankiDeck}» только на чтение: находит в твоих фразах грамматику уроков и делает из них задания. Новые слова, заметки и истории добавляются через AnkiConnect.</p>
          <div className="row">
            <button disabled={busy} onClick={readAnki}>{busy ? "Читаю…" : "Найти колоду"}</button>
          </div>
          {ankiNote && <p className="muted">{ankiNote}</p>}
        </>
      )}

      {STEPS[step] === "Напоминание" && (
        <>
          <h1>Напоминание</h1>
          <p>Короткое уведомление в выбранные дни: следующий урок или ошибки на повтор. Клик открывает Hoard.</p>
          <ReminderFields />
        </>
      )}

      {STEPS[step] === "Синхронизация" && (
        <>
          <h1>Синхронизация с Mac</h1>
          <p>Если Hoard уже стоит на Mac, откройте там «Настройки → Синхронизация», нажмите «Код для iPhone» и вставьте код здесь. Прогресс, заметки и слова будут общими.</p>
          <SyncSection />
        </>
      )}

      {STEPS[step] === "Уровень" && (
        <>
          <h1>Уровень</h1>
          {progress.level ? (
            <>
              <p>Твой уровень уже определён: <strong>{progress.level.value}</strong>.</p>
              <div className="row">
                <button onClick={() => done({ name: "home" })}>Готово</button>
                <button className="ghost" onClick={() => done({ name: "test", kind: "placement" })}>Пройти тест заново</button>
              </div>
            </>
          ) : (
            <>
              <p>Входной тест подберёт уроки под тебя: обычно 20–25 вопросов на разные темы, заканчивается, когда уровень ясен.</p>
              <div className="row">
                <button onClick={() => done({ name: "test", kind: "placement" })}>Пройти входной тест</button>
                <button className="ghost" onClick={() => done({ name: "home" })}>Начать с A1</button>
              </div>
            </>
          )}
        </>
      )}

      <div className="row wizard-nav">
        {step > 0 && <button className="ghost" onClick={() => setStep(step - 1)}>Назад</button>}
        {step < STEPS.length - 1 && <button onClick={() => setStep(step + 1)}>Дальше</button>}
        {step < STEPS.length - 1 && <button className="link" onClick={() => setStep(STEPS.length - 1)}>Пропустить</button>}
      </div>
    </article>
  );
}
