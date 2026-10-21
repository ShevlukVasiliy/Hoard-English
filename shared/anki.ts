import { PARTICLES, comparative, irregular, irregularByForm, looksAdjectiveRu, syllables, verbForms } from "./dict";
import { shuffle } from "./random";
import { vocab } from "./vocab";
import type { AnkiWord, Exercise } from "./types";

// Текст поля Anki без HTML, сущностей и лишних пробелов.
export function cleanField(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(x[0-9a-f]+|\d+);/gi, (_, n: string) => String.fromCodePoint(n[0] === "x" || n[0] === "X" ? parseInt(n.slice(1), 16) : Number(n)))
    .replace(/\[sound:[^\]]*\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const cleanWords = (raw: AnkiWord[]): AnkiWord[] =>
  raw.map((w) => ({ ...w, front: cleanField(w.front), back: cleanField(w.back) })).filter((w) => w.front);

const CYR = /[а-яё]/i;
const words = (s: string) => s.split(/\s+/).filter(Boolean);
export const isEnglish = (s: string) => /[a-z]/i.test(s) && !CYR.test(s);
export const isPhrase = (w: AnkiWord) => isEnglish(w.front) && words(w.front).length >= 3;
export const isSingleWord = (w: AnkiWord) => isEnglish(w.front) && /^[a-z-]+$/i.test(w.front.trim());

const isParticiple = (w: string) => /^[a-z]+ed$/i.test(w) || irregular(irregularByForm(w)?.[0] ?? "")?.[2] === w.toLowerCase();
const V3 = (s: string) => words(s.toLowerCase().replace(/[^a-z' ]/g, " ")).some(isParticiple);

// «Твоя грамматика в твоих карточках»: правило → урок.
export const TEMPLATES: { lessonId: string; label: string; test: (s: string) => boolean }[] = [
  { lessonId: "future-forms", label: "Будущее: will / going to", test: (s) => /\bwill\b|\b'll\b|\bgoing to\b/i.test(s) },
  { lessonId: "present-perfect-continuous", label: "Present Perfect Continuous", test: (s) => /\b(have|has|'ve|'s) been \w+ing\b/i.test(s) },
  { lessonId: "present-perfect-past-simple", label: "Present Perfect", test: (s) => { const m = s.match(/\b(have|has|'ve)\s+(\w+)/i); return !!m && isParticiple(m[2]!) && !/been \w+ing/i.test(s); } },
  { lessonId: "past-perfect", label: "Past Perfect", test: (s) => { const m = s.match(/\b(had|'d)\s+(been\s+)?(\w+)/i); return !!m && (isParticiple(m[3]!) || /ing$/.test(m[3]!)); } },
  { lessonId: "passive-voice", label: "Пассив", test: (s) => { const m = s.match(/\b(is|are|was|were|be|been|being)\s+(\w+)/i); return !!m && isParticiple(m[2]!); } },
  { lessonId: "conditionals-3-mixed", label: "would have / Third Conditional", test: (s) => /\bwould(n't)? have\b|\bwould've\b/i.test(s) },
  { lessonId: "conditionals-1-2", label: "Условия с if", test: (s) => /\bif\b/i.test(s) && !/\bwould have\b/i.test(s) },
  { lessonId: "modals-deduction", label: "must / might / can't have", test: (s) => /\b(must|might|may|could|can't|couldn't) have\b/i.test(s) },
  { lessonId: "used-to-would", label: "used to", test: (s) => /\bused to\b/i.test(s) },
  { lessonId: "relative-clauses", label: "who / which / whose", test: (s) => /\b(who|which|whose)\b/i.test(s) && !/\?$/.test(s.trim()) },
  { lessonId: "present-simple-continuous", label: "Present Continuous", test: (s) => /\b(am|is|are|'m|'re)\s+\w+ing\b/i.test(s) && !/going to/i.test(s) },
  { lessonId: "past-simple-continuous", label: "Past Continuous", test: (s) => /\b(was|were)\s+\w+ing\b/i.test(s) && !/going to/i.test(s) },
  { lessonId: "comparatives", label: "Сравнения", test: (s) => /\b\w+er than\b|\bmore \w+ than\b|\bthe (most|best|worst)\b/i.test(s) },
  { lessonId: "gerund-infinitive", label: "Глагол + -ing / to", test: (s) => /\b(enjoy|avoid|mind|finish|keep|suggest)\s+\w+ing\b|\b(want|decide|hope|plan|agree|refuse|manage|promise)\s+to\b/i.test(s) },
];

export function grammarInCards(cards: AnkiWord[]) {
  const phrases = cards.filter(isPhrase);
  return TEMPLATES.map((t) => ({ ...t, examples: phrases.filter((w) => t.test(w.front)) })).filter((t) => t.examples.length);
}

// Вес карточки: чем больше ошибок в Anki и чем короче интервал, тем чаще попадается.
export const weight = (w: AnkiWord) => 1 + w.lapses * 2 + (w.ivl < 7 ? 1 : 0);

export function weightedSample<T>(items: T[], n: number, w: (x: T) => number): T[] {
  const pool = [...items];
  const out: T[] = [];
  while (out.length < n && pool.length) {
    const total = pool.reduce((s, x) => s + w(x), 0);
    let r = Math.random() * total;
    const i = pool.findIndex((x) => (r -= w(x)) < 0);
    out.push(pool.splice(i < 0 ? pool.length - 1 : i, 1)[0]!);
  }
  return out;
}

const hash = (s: string) => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return (h >>> 0).toString(36); };
const hint = (back: string) => (back.length > 70 ? back.slice(0, 70) + "…" : back);

// Генераторы заданий; каждый возвращает null, если карточка не подходит.
export type DeckTask = { card: AnkiWord; ex: Exercise; kind: "order" | "verb" | "comparative" | "phrasal" };

function orderTask(c: AnkiWord): DeckTask | null {
  const ws = words(c.front.replace(/[.!?]+$/, ""));
  if (!isPhrase(c) || ws.length > 12) return null;
  return { card: c, kind: "order", ex: { id: `anki-o-${hash(c.front)}`, kind: "order", form: "phrase", prompt: `Собери фразу: ${hint(c.back)}`, words: shuffle(ws), answer: ws.join(" ") } };
}

const PRONOUN = /^(i|you|he|she|it|we|they)$/;
const AUX = /^(have|has|had|'ve|i've|you've|we've|they've|i'd|he'd|she'd|been|was|were|be|is|are|never|already|just)$/;
const AMBIGUOUS = new Set(["ground", "found", "left", "lay", "saw", "bound", "wound", "lie", "lit", "fell", "spring", "rose", "felt", "hide", "sink", "set", "cast", "put", "cut", "hit", "let", "shut", "read"]);

function verbTask(c: AnkiWord): DeckTask | null {
  if (!isPhrase(c)) return null;
  const ws = words(c.front);
  const bare = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");
  // форма глагола засчитывается только после местоимения (прошедшее) или вспомогательного (третья форма),
  // иначе «ground», «left», «saw» слишком часто оказываются существительными
  const i = ws.findIndex((w, j) => {
    const f = bare(w).replace(/'.*$/, "");
    const v = irregularByForm(f);
    if (!v || v[0] === f || AMBIGUOUS.has(f) || j === 0) return false;
    const prev = bare(ws[j - 1]!);
    return (PRONOUN.test(prev) && v[1] === f) || (AUX.test(prev) && v[2] === f);
  });
  if (i < 0) return null;
  const form = ws[i]!.replace(/[^a-z]/gi, "");
  const base = irregularByForm(form)![0];
  const prompt = ws.map((w, j) => (j === i ? w.replace(form, "___") : w)).join(" ");
  return { card: c, kind: "verb", ex: { id: `anki-v-${hash(c.front)}`, kind: "gap", prompt: `${prompt} (${base})`, answers: [form], explain: hint(c.back) } };
}

// Прилагательные без степеней сравнения или уже в сравнительной форме.
const NON_GRADABLE = new Set(["further", "actual", "rear", "boiling", "subconscious", "sentient", "juvenile", "former", "latter", "inner", "outer", "upper", "lower", "main", "only", "total", "entire", "unique", "dead", "pregnant"]);

function comparativeTask(c: AnkiWord): DeckTask | null {
  if (!isSingleWord(c)) return null;
  // часть речи — по CEFR-J; слов, которых там нет, — по русскому переводу
  const v = vocab(c.front);
  const adj = NON_GRADABLE.has(c.front.toLowerCase()) ? false : v ? v.pos.includes("adjective") : looksAdjectiveRu(c.back) && !irregularByForm(c.front);
  if (!adj) return null;
  const cmp = comparative(c.front, v ? "known" : true);
  if (!cmp) return null;
  const b = c.front.toLowerCase();
  // у двусложных на -y в живом языке встречаются обе формы
  const answers = cmp[0].endsWith("ier") && syllables(b) === 2 ? [cmp[0], `more ${b}`] : [cmp[0]];
  return { card: c, kind: "comparative", ex: { id: `anki-c-${hash(c.front)}`, kind: "gap", prompt: `${c.front.toLowerCase()} (${hint(c.back)}) → сравнительная степень: ___`, answers, explain: `${c.front.toLowerCase()} → ${cmp[0]} → the ${cmp[1]}` } };
}

function phrasalTask(c: AnkiWord): DeckTask | null {
  const m = c.front.trim().toLowerCase().match(/^(?:to )?([a-z]+) ([a-z]+)$/);
  if (!m || !PARTICLES.has(m[2]!)) return null;
  const [, past, part] = verbForms(m[1]!);
  const usePart = Math.random() < 0.5;
  const form = `${usePart ? part : past} ${m[2]}`;
  return { card: c, kind: "phrasal", ex: { id: `anki-p-${hash(c.front)}`, kind: "gap", prompt: `${m[1]} ${m[2]} (${hint(c.back)}) → ${usePart ? "третья форма (have …)" : "Past Simple"}: ___`, answers: [form], explain: `${m[1]} ${m[2]} → ${past} ${m[2]} → ${part} ${m[2]}` } };
}

const GENERATORS = [orderTask, verbTask, comparativeTask, phrasalTask];

// Набор заданий из колоды: проблемные карточки чаще, генераторы чередуются.
export function deckPractice(cards: AnkiWord[], n = 10): DeckTask[] {
  const tasks = cards.flatMap((c) => GENERATORS.map((g) => g(c)).filter((t): t is DeckTask => !!t));
  // одна карточка — одно задание
  const seen = new Set<string>();
  return weightedSample(tasks, tasks.length, (t) => weight(t.card)).filter((t) => (seen.has(t.card.front) ? false : (seen.add(t.card.front), true))).slice(0, n);
}

export const problemCards = (cards: AnkiWord[], n = 10) => [...cards].filter((c) => c.lapses > 0).sort((a, b) => b.lapses - a.lapses).slice(0, n);
