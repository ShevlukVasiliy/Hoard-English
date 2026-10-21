// Выделение текста в областях для чтения (.reading).
// WebKit при многострочном выделении заливает промежуток до края блока.
// Поэтому системное выделение там прозрачное, а рисуем его через
// CSS Custom Highlight API: подсвечиваются только строки с текстом.

type Highlights = { set(name: string, h: unknown): void; delete(name: string): void };
declare const Highlight: { new (...ranges: Range[]): unknown };

export const highlightsSupported = () => typeof CSS !== "undefined" && "highlights" in CSS && typeof Highlight !== "undefined";

const registry = () => (CSS as unknown as { highlights: Highlights }).highlights;

export function setHighlight(name: string, ranges: Range[]) {
  if (!highlightsSupported()) return;
  if (ranges.length) registry().set(name, new Highlight(...ranges));
  else registry().delete(name);
}

// Ближайшая область чтения, внутри которой лежит узел.
export function readingRoot(node: Node | null): HTMLElement | null {
  const el = node instanceof Element ? node : node?.parentElement;
  return (el?.closest(".reading") as HTMLElement | null) ?? null;
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
