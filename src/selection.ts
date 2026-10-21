// Выделение текста в частях урока и истории ([data-part]).
// WebKit при многострочном выделении заливает промежуток до края блока.
// Поэтому системное выделение там прозрачное, а рисуем его через
// CSS Custom Highlight API: подсвечиваются только строки с текстом.

type Highlights = { set(name: string, h: unknown): void; delete(name: string): void };
declare const Highlight: { new (...ranges: Range[]): { priority: number } };

// выделение поверх позолоты, вспышка — поверх обычной позолоты
const PRIORITY: Record<string, number> = { selection: 2, flash: 1 };

export const highlightsSupported = () => typeof CSS !== "undefined" && "highlights" in CSS && typeof Highlight !== "undefined";

const registry = () => (CSS as unknown as { highlights: Highlights }).highlights;

export function setHighlight(name: string, ranges: Range[]) {
  if (!highlightsSupported()) return;
  if (!ranges.length) return registry().delete(name);
  const h = new Highlight(...ranges);
  h.priority = PRIORITY[name] ?? 0;
  registry().set(name, h);
}

// Часть текста, внутри которой лежит узел.
export function readingRoot(node: Node | null): HTMLElement | null {
  const el = node instanceof Element ? node : node?.parentElement;
  return (el?.closest("[data-part]") as HTMLElement | null) ?? null;
}

// Подключается один раз в App.
export function installSelectionPaint(): () => void {
  if (!highlightsSupported()) return () => {};
  document.documentElement.classList.add("paint-selection");
  const onChange = () => {
    const sel = document.getSelection();
    const ranges: Range[] = [];
    if (sel) for (let i = 0; i < sel.rangeCount; i++) {
      const r = sel.getRangeAt(i);
      if (!r.collapsed && (readingRoot(r.startContainer) || readingRoot(r.endContainer))) ranges.push(r.cloneRange());
    }
    setHighlight("selection", ranges);
  };
  document.addEventListener("selectionchange", onChange);
  return () => {
    document.removeEventListener("selectionchange", onChange);
    setHighlight("selection", []);
  };
}
