import type { Highlight } from "./types";

// Где фрагмент сейчас в тексте части: ближайшее к сохранённому смещению вхождение.
// Текст урока могли поправить — тогда смещение устарело, но фрагмент ищется по тексту.
export function locate(partText: string, h: Pick<Highlight, "start" | "text">): number | undefined {
  if (partText.substr(h.start, h.text.length) === h.text) return h.start;
  let best: number | undefined;
  for (let i = partText.indexOf(h.text); i !== -1; i = partText.indexOf(h.text, i + 1))
    if (best === undefined || Math.abs(i - h.start) < Math.abs(best - h.start)) best = i;
  return best;
}

// Выделение [start, end) в тексте части; края с пробелами срезаются.
export function trimSpan(partText: string, start: number, end: number): [number, number] | undefined {
  while (start < end && /\s/.test(partText[start]!)) start++;
  while (end > start && /\s/.test(partText[end - 1]!)) end--;
  return end - start >= 2 ? [start, end] : undefined;
}

let seq = 0;
const newId = (now: string) => `${Date.parse(now).toString(36)}${(seq++).toString(36)}`;

// Новый фрагмент склеивается со всеми пересекающимися и соседними в той же части.
export function addHighlight(
  items: Highlight[],
  at: { lessonId: string; part: string; start: number; end: number; partText: string },
  now = new Date().toISOString(),
): { items: Highlight[]; added: Highlight } {
  let [start, end] = [at.start, at.end];
  const merged: string[] = [];
  for (const h of items) {
    if (h.lessonId !== at.lessonId || h.part !== at.part) continue;
    const s = locate(at.partText, h);
    if (s === undefined || s > end || s + h.text.length < start) continue;
    start = Math.min(start, s);
    end = Math.max(end, s + h.text.length);
    merged.push(h.id);
  }
  const old = items.filter((h) => merged.includes(h.id));
  const added: Highlight = {
    id: newId(now),
    lessonId: at.lessonId,
    part: at.part,
    start,
    text: at.partText.slice(start, end),
    createdAt: old.map((h) => h.createdAt).sort()[0] ?? now,
  };
  return { items: [...items.filter((h) => !merged.includes(h.id)), added], added };
}

export const removeHighlight = (items: Highlight[], id: string) => items.filter((h) => h.id !== id);

// Порядок частей урока: теория по блокам, затем история.
export function partOrder(part: string): number {
  const [kind, n] = part.split(":");
  const i = Number(n ?? 0);
  if (kind === "theory") return i * 2;
  if (kind === "why") return i * 2 + 1;
  return 10_000;
}
