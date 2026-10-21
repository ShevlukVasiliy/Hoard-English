import { useEffect, useRef, useState } from "react";

// Свайп двумя пальцами по трекпаду: горизонтальный wheel с deltaX.
// У края окна выезжает полукруг со стрелкой и заполняется по мере свайпа.
const THRESHOLD = 140;
const IDLE_MS = 160;
// после срабатывания инерционные события ещё идут — их пропускаем
const COOLDOWN_MS = 450;

export function SwipeNav({ back, forward, canBack, canForward }: { back: () => void; forward: () => void; canBack: boolean; canForward: boolean }) {
  const [pull, setPull] = useState(0);
  const acc = useRef(0);
  const idle = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lockedUntil = useRef(0);
  const ref = useRef({ back, forward, canBack, canForward });
  ref.current = { back, forward, canBack, canForward };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Date.now() < lockedUntil.current) return;
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) * 1.2) return;
      // горизонтально прокручиваемые области (поля ввода, списки) — не жест
      for (let el = e.target as HTMLElement | null; el; el = el.parentElement)
        if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== "visible" && getComputedStyle(el).overflowX !== "hidden") return;
      const r = ref.current;
      acc.current -= e.deltaX;
      if ((acc.current > 0 && !r.canBack) || (acc.current < 0 && !r.canForward)) acc.current = 0;
      setPull(acc.current);
      clearTimeout(idle.current);
      if (Math.abs(acc.current) >= THRESHOLD) {
        acc.current > 0 ? r.back() : r.forward();
        acc.current = 0;
        setPull(0);
        lockedUntil.current = Date.now() + COOLDOWN_MS;
        return;
      }
      idle.current = setTimeout(() => { acc.current = 0; setPull(0); }, IDLE_MS);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  if (!pull) return null;
  const p = Math.min(1, Math.abs(pull) / THRESHOLD);
  return (
    <div className={`swipe-hint ${pull > 0 ? "left" : "right"}${p >= 1 ? " ready" : ""}`} style={{ "--p": p } as React.CSSProperties} aria-hidden>
      <span>{pull > 0 ? "‹" : "›"}</span>
    </div>
  );
}

type Keys = {
  back: () => void;
  forward: () => void;
  tab: (i: number) => void;
  settings: () => void;
  help: () => void;
};

const typing = (t: EventTarget | null) => t instanceof HTMLElement && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName));

// Глобальные шорткаты. В приложении ⌘[ ⌘] ⌘, ⌘1–5 приходят и из меню macOS.
export function useShortcuts(k: Keys) {
  const ref = useRef(k);
  ref.current = k;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const r = ref.current;
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "[") { e.preventDefault(); r.back(); }
      else if (mod && e.key === "]") { e.preventDefault(); r.forward(); }
      else if (mod && e.key === ",") { e.preventDefault(); r.settings(); }
      else if (mod && /^[1-5]$/.test(e.key)) { e.preventDefault(); r.tab(Number(e.key) - 1); }
      else if (!mod && e.key === "?" && !typing(e.target)) { e.preventDefault(); r.help(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
}

const SHORTCUTS: [string, string][] = [
  ["⌘[  ⌘]", "назад / вперёд"],
  ["⌘1 … ⌘5", "вкладки"],
  ["⌘,", "настройки"],
  ["1 – 4", "вариант ответа"],
  ["Enter", "проверить / дальше"],
  ["⌘S", "сохранить выделенный фрагмент"],
  ["?", "эта справка"],
  ["Esc", "закрыть"],
];

export function ShortcutsHelp({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "?") { e.preventDefault(); onClose(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="overlay" onClick={onClose}>
      <div className="help" role="dialog" aria-label="Клавиши" onClick={(e) => e.stopPropagation()}>
        <h2>Клавиши</h2>
        <dl>
          {SHORTCUTS.map(([k, v]) => (
            <div key={k}><dt><kbd>{k}</kbd></dt><dd>{v}</dd></div>
          ))}
        </dl>
        <p className="muted small">Назад и вперёд — ещё и свайпом двумя пальцами по трекпаду.</p>
        <button className="ghost small" autoFocus onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}
