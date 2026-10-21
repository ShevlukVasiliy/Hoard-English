import { invoke } from "@tauri-apps/api/core";
import type { Depth, Settings } from "../shared/types";
import { useApp } from "./state";
import { inTauri } from "./storage";

// Порядок дней — с понедельника; значения как в Date.getDay(): 0 = воскресенье.
const DAYS: { v: number; short: string; long: string }[] = [
  { v: 1, short: "Пн", long: "понедельник" },
  { v: 2, short: "Вт", long: "вторник" },
  { v: 3, short: "Ср", long: "среда" },
  { v: 4, short: "Чт", long: "четверг" },
  { v: 5, short: "Пт", long: "пятница" },
  { v: 6, short: "Сб", long: "суббота" },
  { v: 0, short: "Вс", long: "воскресенье" },
];

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export function ReminderFields() {
  const { settings: s, setSettings, toast } = useApp();
  const set = (patch: Partial<Settings>) => setSettings({ ...s, ...patch });
  const toggle = (d: number) => {
    const days = s.reminderDays.includes(d) ? s.reminderDays.filter((x) => x !== d) : [...s.reminderDays, d];
    set({ reminderDays: days.sort() });
  };
  const test = async () => {
    if (!inTauri) return toast("Уведомления работают только в приложении");
    try { await invoke("test_reminder"); } catch (e) { toast(`Уведомление не отправлено: ${e}`); }
  };
  return (
    <>
      <label className="check">
        <input type="checkbox" checked={s.remindersEnabled} onChange={(e) => set({ remindersEnabled: e.target.checked })} />
        Напоминать о занятиях
      </label>
      <fieldset className="days" disabled={!s.remindersEnabled}>
        <legend className="sr-only">Дни напоминаний</legend>
        {DAYS.map((d) => (
          <label key={d.v} className={s.reminderDays.includes(d.v) ? "day on" : "day"} title={d.long}>
            <input type="checkbox" checked={s.reminderDays.includes(d.v)} onChange={() => toggle(d.v)} />
            {d.short}
          </label>
        ))}
        <input
          type="time"
          aria-label="Время напоминания"
          value={hhmm(s.reminderMinutes)}
          onChange={(e) => {
            const [h, m] = e.target.value.split(":").map(Number);
            if (h !== undefined && m !== undefined && !Number.isNaN(h) && !Number.isNaN(m)) set({ reminderMinutes: h * 60 + m });
          }}
        />
      </fieldset>
      <p className="muted small">
        {!s.remindersEnabled ? "Напоминания выключены."
          : !s.reminderDays.length ? "Не выбрано ни одного дня — уведомлений не будет."
          : s.reminderDays.length === 7 ? `Каждый день в ${hhmm(s.reminderMinutes)}.`
          : `${DAYS.filter((d) => s.reminderDays.includes(d.v)).map((d) => d.short).join(", ")} в ${hhmm(s.reminderMinutes)}.`}
        {" "}<button className="link" onClick={test}>Прислать пробное уведомление</button>
      </p>
    </>
  );
}

export function DepthChoice({ which, label }: { which: "theoryDepth" | "storyDepth"; label: string }) {
  const { settings: s, setSettings } = useApp();
  const opts: { v: Depth; label: string; hint: string }[] = which === "theoryDepth"
    ? [{ v: "short", label: "Кратко", hint: "правило, примеры, ловушка" }, { v: "long", label: "Подробно", hint: "больше объяснений и примеров" }]
    : [{ v: "short", label: "Кратко", hint: "минуты на две" }, { v: "long", label: "Подробно", hint: "в три-четыре раза длиннее" }];
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
