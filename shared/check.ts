import type { Exercise } from "./types";

const CONTRACTIONS: [RegExp, string][] = [
  [/\bwon't\b/g, "will not"],
  [/\bcan't\b/g, "cannot"],
  [/\bshan't\b/g, "shall not"],
  [/\bain't\b/g, "is not"],
  [/n't\b/g, " not"],
  [/'m\b/g, " am"],
  [/'re\b/g, " are"],
  [/'ve\b/g, " have"],
  [/'ll\b/g, " will"],
  [/'d\b/g, " would"],
];

// Регистр, типографские апострофы и кавычки, пробелы, конечная пунктуация.
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[‘’ʼ`´]/g, "'")
    .replace(/[“”«»]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .replace(/\s*([,;:])\s*/g, "$1 ")
    .replace(/[.!?…\s]+$/g, "")
    .trim();
}

// Все прочтения сокращений: 's бывает и is, и has; 'd — would или had.
function expand(s: string): string[] {
  let out = s;
  for (const [re, full] of CONTRACTIONS) out = out.replace(re, full);
  out = out.replace(/\bcan not\b/g, "cannot").replace(/\s+/g, " ").trim();
  const variants = new Set([out]);
  if (/'d\b/.test(s)) variants.add(expand(s.replace(/'d\b/g, " had"))[0]!);
  if (/\b\w+'s\b/.test(out)) {
    variants.add(out.replace(/\b(he|she|it|that|there|what|who|where|here)'s\b/g, "$1 is"));
    variants.add(out.replace(/\b(he|she|it|that|there|what|who|where|here)'s\b/g, "$1 has"));
  }
  return [...variants];
}

export function matches(given: string, accepted: string[]): boolean {
  const g = expand(normalize(given));
  return accepted.some((a) => expand(normalize(a)).some((v) => g.includes(v)));
}

// given для choice — индекс варианта строкой.
export function checkAnswer(ex: Exercise, given: string): boolean {
  switch (ex.kind) {
    case "choice":
      return Number(given) === ex.answer;
    case "order":
      return matches(given, [ex.answer]);
    case "gap":
    case "fix":
    case "transform":
      return matches(given, ex.answers);
  }
}

export function correctAnswer(ex: Exercise): string {
  switch (ex.kind) {
    case "choice":
      return ex.options[ex.answer] ?? "";
    case "order":
      return ex.answer;
    default:
      return ex.answers[0] ?? "";
  }
}
