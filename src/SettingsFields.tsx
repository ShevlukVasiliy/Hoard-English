import { invoke } from "@tauri-apps/api/core";
import { T } from "../shared/i18n";
import type { Depth, Settings } from "../shared/types";
import { useApp } from "./state";
import { inTauri } from "./storage";

// Порядок дней — с понедельника; значения как в Date.getDay(): 0 = воскресенье.
const DAY_VALUES = [1, 2, 3, 4, 5, 6, 0];
const days = () => DAY_VALUES.map((v, i) => ({ v, short: T.reminder.days[i]![0], long: T.reminder.days[i]![1] }));

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export function ReminderFields() {
  const { settings: s, setSettings, toast } = useApp();
  const set = (patch: Partial<Settings>) => setSettings({ ...s, ...patch });
  const DAYS = days();
  const toggle = (d: number) => {
    const days = s.reminderDays.includes(d) ? s.reminderDays.filter((x) => x !== d) : [...s.reminderDays, d];
    set({ reminderDays: days.sort() });
  };
  const test = async () => {
    if (!inTauri) return toast(T.reminder.appOnly);
    try { await invoke("test_reminder"); } catch (e) { toast(T.reminder.testFailed(e)); }
  };
  return (
    <>
      <label className="check">
        <input type="checkbox" checked={s.remindersEnabled} onChange={(e) => set({ remindersEnabled: e.target.checked })} />
        {T.reminder.enable}
      </label>
      <fieldset className="days" disabled={!s.remindersEnabled}>
        <legend className="sr-only">{T.reminder.daysLabel}</legend>
        {DAYS.map((d) => (
          <label key={d.v} className={s.reminderDays.includes(d.v) ? "day on" : "day"} title={d.long}>
            <input type="checkbox" checked={s.reminderDays.includes(d.v)} onChange={() => toggle(d.v)} />
            {d.short}
          </label>
        ))}
        <input
          type="time"
          aria-label={T.reminder.time}
          value={hhmm(s.reminderMinutes)}
          onChange={(e) => {
            const [h, m] = e.target.value.split(":").map(Number);
            if (h !== undefined && m !== undefined && !Number.isNaN(h) && !Number.isNaN(m)) set({ reminderMinutes: h * 60 + m });
          }}
        />
      </fieldset>
      <p className="muted small">
        {!s.remindersEnabled ? T.reminder.off
          : !s.reminderDays.length ? T.reminder.noDays
          : s.reminderDays.length === 7 ? T.reminder.daily(hhmm(s.reminderMinutes))
          : T.reminder.some(DAYS.filter((d) => s.reminderDays.includes(d.v)).map((d) => d.short).join(", "), hhmm(s.reminderMinutes))}
        {" "}<button className="link" onClick={test}>{T.reminder.test}</button>
      </p>
    </>
  );
}

export function DepthChoice({ which, label }: { which: "theoryDepth" | "storyDepth"; label: string }) {
  const { settings: s, setSettings } = useApp();
  const opts: { v: Depth; label: string; hint: string }[] = which === "theoryDepth"
    ? [{ v: "short", label: T.settings.depth.short, hint: T.settings.depth.theoryShort }, { v: "long", label: T.settings.depth.long, hint: T.settings.depth.theoryLong }]
    : [{ v: "short", label: T.settings.depth.short, hint: T.settings.depth.storyShort }, { v: "long", label: T.settings.depth.long, hint: T.settings.depth.storyLong }];
  return (
    <div className="field">
      <span>{label}</span>
      <div className="segmented" role="radiogroup" aria-label={label}>
        {opts.map((o) => (
          <button key={o.v} role="radio" aria-checked={s[which] === o.v} className={s[which] === o.v ? "on" : ""} onClick={() => setSettings({ ...s, [which]: o.v })}>
            {o.label} <span className="muted small">{o.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
