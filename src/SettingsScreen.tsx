import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import type { Settings } from "../shared/types";
import { useApp } from "./state";
import { inTauri } from "./storage";
import { DepthChoice, ReminderFields } from "./SettingsFields";
import { setAutostart } from "./system";

export function SettingsScreen() {
  const { settings: s, setSettings, progress, go } = useApp();
  const [note, setNote] = useState<string | null>(null);
  const set = (patch: Partial<Settings>) => setSettings({ ...s, ...patch });

  const exportProgress = async () => {
    const json = JSON.stringify(progress, null, 2);
    if (inTauri) {
      const path = await invoke<string>("export_progress", { contents: json });
      setNote(`Сохранено: ${path}`);
    } else {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
      a.download = "eng-teacher-progress.json";
      a.click();
    }
  };

  return (
    <>
      <h1>Настройки</h1>

      <section>
        <h2>Подача</h2>
        <DepthChoice which="theoryDepth" label="Теория" />
        <DepthChoice which="storyDepth" label="Истории про язык" />
      </section>

      <section>
        <h2>Напоминание</h2>
        <ReminderFields />
        <label className="check">
          <input
            type="checkbox"
            checked={s.autostart}
            onChange={(e) => {
              const on = e.target.checked;
              set({ autostart: on });
              setAutostart(on).catch((err) => setNote(`Автозапуск не изменён: ${err}`));
            }}
          />
          Запускать при входе в систему (окно не открывается, приложение ждёт в трее)
        </label>
      </section>

      <section>
        <h2>Anki</h2>
        <label className="field">
          Колода
          <input value={s.ankiDeck} onChange={(e) => set({ ankiDeck: e.target.value })} />
        </label>
        <label className="field">
          Путь к collection.anki2 <span className="muted small">пусто — найти автоматически</span>
          <input value={s.ankiPath ?? ""} placeholder="~/Library/Application Support/Anki2/…/collection.anki2" onChange={(e) => set({ ankiPath: e.target.value || undefined })} />
        </label>
      </section>

      <section>
        <h2>Оформление</h2>
        <div className="row">
          {(["system", "light", "dark"] as const).map((t) => (
            <button key={t} className={s.theme === t ? "" : "ghost"} onClick={() => set({ theme: t })}>
              {{ system: "Как в системе", light: "Светлая", dark: "Тёмная" }[t]}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2>Данные</h2>
        <p className="muted">Всё хранится в ~/.eng-teacher/ на этом компьютере.</p>
        <button className="ghost" onClick={exportProgress}>Экспортировать прогресс в JSON</button>
        {note && <p className="muted">{note}</p>}
        <p><button className="link" onClick={() => go({ name: "onboarding" })}>Пройти первичную настройку заново</button></p>
      </section>

      <section>
        <h2>Источники</h2>
        <p className="muted small">
          Уровни грамматических тем — по CEFR-J Grammar Profile (ver. 20180315), уровни слов — по CEFR-J Wordlist (ver. 1.5),
          Yukio Tono, Tokyo University of Foreign Studies, <a href="http://www.cefr-j.org/download.html">cefr-j.org</a>.
          Уроки, задания и истории написаны для этого приложения.
        </p>
      </section>
    </>
  );
}
