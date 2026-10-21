import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { detectLang, LANGS, T } from "../shared/i18n";
import type { Settings } from "../shared/types";
import { useApp } from "./state";
import { inTauri } from "./storage";
import { DepthChoice, ReminderFields } from "./SettingsFields";
import { setAutostart } from "./system";
import { SyncSection } from "./SyncSection";

// Родной язык: интерфейс, теория A1–B1 и ловушки.
export function LangChoice() {
  const { settings: s, setSettings } = useApp();
  const current = s.lang ?? (s.onboarded ? "ru" : detectLang());
  return (
    <div className="segmented" role="radiogroup" aria-label={T.settings.language}>
      {LANGS.map((l) => (
        <button key={l.id} role="radio" lang={l.id} aria-checked={current === l.id} className={current === l.id ? "on" : ""} onClick={() => setSettings({ ...s, lang: l.id })}>
          {l.name}
        </button>
      ))}
    </div>
  );
}

export function SettingsScreen() {
  const { settings: s, setSettings, progress, go } = useApp();
  const [note, setNote] = useState<string | null>(null);
  const set = (patch: Partial<Settings>) => setSettings({ ...s, ...patch });

  const exportProgress = async () => {
    const json = JSON.stringify(progress, null, 2);
    if (inTauri) {
      const path = await invoke<string>("export_progress", { contents: json });
      setNote(T.settings.saved(path));
    } else {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
      a.download = "eng-teacher-progress.json";
      a.click();
    }
  };

  return (
    <>
      <h1>{T.settings.title}</h1>

      <section>
        <h2>{T.settings.language}</h2>
        <LangChoice />
        <p className="muted small">{T.settings.languageHint}</p>
      </section>

      <section>
        <h2>{T.settings.delivery}</h2>
        <DepthChoice which="theoryDepth" label={T.settings.theory} />
        <DepthChoice which="storyDepth" label={T.settings.stories} />
      </section>

      <SyncSection />

      {inTauri && <section>
        <h2>{T.settings.reminder}</h2>
        <ReminderFields />
        <label className="check">
          <input
            type="checkbox"
            checked={s.autostart}
            onChange={(e) => {
              const on = e.target.checked;
              set({ autostart: on });
              setAutostart(on).catch((err) => setNote(T.settings.autostartFailed(err)));
            }}
          />
          {T.settings.autostart}
        </label>
      </section>}

      {inTauri && <section>
        <h2>Anki</h2>
        <label className="field">
          {T.settings.deck}
          <input value={s.ankiDeck} onChange={(e) => set({ ankiDeck: e.target.value })} />
        </label>
        <label className="field">
          {T.settings.ankiPath} <span className="muted small">{T.settings.ankiPathHint}</span>
          <input value={s.ankiPath ?? ""} placeholder=".../Anki2/…/collection.anki2" onChange={(e) => set({ ankiPath: e.target.value || undefined })} />
        </label>
      </section>}

      <section>
        <h2>{T.settings.look}</h2>
        <div className="row">
          {(["system", "light", "dark"] as const).map((t) => (
            <button key={t} className={s.theme === t ? "" : "ghost"} onClick={() => set({ theme: t })}>
              {T.settings.themes[t]}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2>{T.settings.data}</h2>
        <p className="muted">{inTauri ? T.settings.dataDesktop : T.settings.dataPhone}</p>
        <button className="ghost" onClick={exportProgress}>{T.settings.export}</button>
        {note && <p className="muted">{note}</p>}
        <p><button className="link" onClick={() => go({ name: "onboarding" })}>{T.settings.onboarding}</button></p>
      </section>

      <section>
        <h2>{T.settings.sources}</h2>
        <p className="muted small">
          {T.settings.sourcesText} <a href="http://www.cefr-j.org/download.html">cefr-j.org</a>. {T.settings.sourcesOwn}
        </p>
      </section>
    </>
  );
}
