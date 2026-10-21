import { useCallback, useEffect, useLayoutEffect, useState, type RefObject } from "react";
import { addHighlight, locate, trimSpan } from "../shared/highlights";
import type { Highlight } from "../shared/types";
import { setHighlight } from "./selection";
import { useApp } from "./state";
import { inTauri } from "./storage";

// Сохранённые фрагменты в уроке и на странице истории.
// Части текста помечены data-part ("theory:0", "story", "why:1");
// фрагмент — смещение и текст внутри textContent части.

const partOf = (node: Node | null): HTMLElement | null => {
  const el = node instanceof Element ? node : node?.parentElement;
  return (el?.closest("[data-part]") as HTMLElement | null) ?? null;
};

// Смещение точки (node, offset) от начала части.
function offsetIn(part: HTMLElement, node: Node, offset: number): number {
  const r = document.createRange();
  r.setStart(part, 0);
  r.setEnd(node, offset);
  return r.toString().length;
}

// Range для [start, start + length) в тексте части.
function rangeIn(part: HTMLElement, start: number, length: number): Range | undefined {
  const walker = document.createTreeWalker(part, NodeFilter.SHOW_TEXT);
  const r = document.createRange();
  let pos = 0;
  let begun = false;
  const end = start + length;
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const len = n.textContent?.length ?? 0;
    if (!begun && start < pos + len) { r.setStart(n, start - pos); begun = true; }
    if (begun && end <= pos + len) { r.setEnd(n, end - pos); return r; }
    pos += len;
  }
}

function rangeOf(root: HTMLElement, h: Highlight): Range | undefined {
  const part = root.querySelector<HTMLElement>(`[data-part="${h.part}"]`);
  if (!part) return;
  const at = locate(part.textContent ?? "", h);
  return at === undefined ? undefined : rangeIn(part, at, h.text.length);
}

// Рисует сохранённые фрагменты урока; repaint — всё, что меняет текст на экране.
export function useSavedPaint(root: RefObject<HTMLElement | null>, lessonId: string, repaint: unknown[]) {
  const { highlights } = useApp();
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const ranges = highlights.items.filter((h) => h.lessonId === lessonId).flatMap((h) => rangeOf(el, h) ?? []);
    setHighlight("saved", ranges);
    return () => setHighlight("saved", []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlights, lessonId, ...repaint]);
}

// Кратко подсвечивает фрагмент ярче и прокручивает к нему (переход из «Заметок»).
export function flashHighlight(root: HTMLElement, h: Highlight) {
  // глосса на узком окне свёрнута — раскрываем, иначе фрагмент не виден
  const details = root.querySelector(`[data-part="${h.part}"]`)?.closest("details");
  if (details) details.open = true;
  const r = rangeOf(root, h);
  if (!r) return;
  const rect = r.getBoundingClientRect();
  window.scrollTo({ top: window.scrollY + rect.top - window.innerHeight / 3, behavior: "smooth" });
  setHighlight("flash", [r]);
  setTimeout(() => setHighlight("flash", []), 1600);
}

type Menu =
  | { kind: "save"; x: number; y: number; part: HTMLElement; start: number; end: number }
  | { kind: "saved"; x: number; y: number; h: Highlight }
  | { kind: "done"; x: number; y: number };

// Плашка над выделением: «Сохранить ⌘S»; над сохранённым — «Убрать · В Anki».
export function SelectionMenu({ root, lessonId }: { root: RefObject<HTMLElement | null>; lessonId: string }) {
  const { highlights, record, sendNoteToAnki } = useApp();
  const [menu, setMenu] = useState<Menu | null>(null);

  // выделение внутри одной части этого экрана; конец обрезается по границе части
  const readSelection = useCallback((): Extract<Menu, { kind: "save" }> | null => {
    const sel = document.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount || !root.current) return null;
    const r = sel.getRangeAt(0);
    const part = partOf(r.startContainer);
    if (!part || !root.current.contains(part)) return null;
    const text = part.textContent ?? "";
    const start = offsetIn(part, r.startContainer, r.startOffset);
    const end = part.contains(r.endContainer) ? offsetIn(part, r.endContainer, r.endOffset) : text.length;
    const span = trimSpan(text, start, end);
    if (!span) return null;
    const rects = r.getClientRects();
    const last = rects[rects.length - 1] ?? r.getBoundingClientRect();
    return { kind: "save", x: last.right, y: last.top + window.scrollY, part, start: span[0], end: span[1] };
  }, [root]);

  const save = useCallback((m: Extract<Menu, { kind: "save" }>) => {
    const { items, added } = addHighlight(highlights.items, {
      lessonId, part: m.part.dataset.part!, start: m.start, end: m.end, partText: m.part.textContent ?? "",
    });
    const kept = new Set(items.map((h) => h.id));
    record({ t: "highlight", item: added, replaces: highlights.items.filter((h) => !kept.has(h.id)).map((h) => h.id) });
    document.getSelection()?.removeAllRanges();
    setMenu({ kind: "done", x: m.x, y: m.y });
    setTimeout(() => setMenu((cur) => (cur?.kind === "done" ? null : cur)), 1100);
  }, [highlights, lessonId, record]);

  useEffect(() => {
    const onUp = (e: MouseEvent) => {
      if ((e.target as Element).closest?.(".hl-menu")) return;
      // клик без выделения по сохранённому фрагменту — меню фрагмента
      setTimeout(() => {
        const sel = readSelection();
        if (sel) return setMenu(sel);
        const el = root.current;
        const caret = document.caretRangeFromPoint?.(e.clientX, e.clientY);
        if (el && caret && el.contains(caret.startContainer)) {
          const h = highlights.items.find((h) => h.lessonId === lessonId && rangeOf(el, h)?.isPointInRange(caret.startContainer, caret.startOffset));
          if (h) return setMenu({ kind: "saved", x: e.clientX, y: e.clientY + window.scrollY - 8, h });
        }
        setMenu(null);
      });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        const sel = readSelection();
        if (sel) { e.preventDefault(); save(sel); }
      }
    };
    // касание: выделение долгим нажатием не заканчивается mouseup — ждём, пока ручки выделения замрут
    let still: ReturnType<typeof setTimeout> | undefined;
    const onSelection = () => {
      clearTimeout(still);
      still = setTimeout(() => { const sel = readSelection(); if (sel) setMenu(sel); }, 450);
    };
    const touch = matchMedia("(pointer: coarse)").matches;
    document.addEventListener("mouseup", onUp);
    document.addEventListener("keydown", onKey);
    if (touch) document.addEventListener("selectionchange", onSelection);
    return () => {
      clearTimeout(still);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("selectionchange", onSelection);
    };
  }, [highlights, lessonId, readSelection, root, save]);

  if (!menu) return null;
  const style = { left: Math.max(12, Math.min(menu.x, window.innerWidth - 12)), top: menu.y };
  return (
    <div className="hl-menu" style={style} role="toolbar" onMouseDown={(e) => e.preventDefault()}>
      {menu.kind === "save" && <button onClick={() => save(menu)}>Сохранить {inTauri && <span className="kbd">⌘S</span>}</button>}
      {menu.kind === "done" && <span className="hl-done">Сохранено</span>}
      {menu.kind === "saved" && (
        <>
          <button onClick={() => { record({ t: "unhighlight", noteId: menu.h.id }); setMenu(null); }}>Убрать</button>
          <span className="hl-sep" aria-hidden />
          {menu.h.ankiAt
            ? <span className="hl-done">В Anki</span>
            : <button onClick={() => { sendNoteToAnki(menu.h); setMenu(null); }}>В Anki</button>}
        </>
      )}
    </div>
  );
}
