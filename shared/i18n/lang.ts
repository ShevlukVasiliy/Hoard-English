// Родной язык ученика: на нём интерфейс, теория A1–B1, пояснения и ловушки.
// Теория B2+ и истории B2+ — на английском для всех.
export const LANGS = [
  { id: "ru", name: "Русский" },
  { id: "es", name: "Español" },
  { id: "de", name: "Deutsch" },
  { id: "pl", name: "Polski" },
] as const;
export type Lang = (typeof LANGS)[number]["id"];

export const isLang = (v: unknown): v is Lang => LANGS.some((l) => l.id === v);

// Текущий язык — модульное состояние: меняется из setLang (shared/i18n/index.ts).
let current: Lang = "ru";
export const lang = () => current;
export const setCurrentLang = (l: Lang) => { current = l; };

// Язык системы, если он поддержан; иначе русский.
export function detectLang(languages: readonly string[] = typeof navigator === "undefined" ? [] : navigator.languages): Lang {
  for (const tag of languages) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLang(base)) return base;
  }
  return "ru";
}

const rules = new Map<Lang, Intl.PluralRules>();

// Форма слова по числу для текущего языка: plural(5, { one: "ошибка", few: "ошибки", many: "ошибок" }).
export function plural(n: number, forms: Partial<Record<Intl.LDMLPluralRule, string>> & { other?: string }): string {
  let r = rules.get(current);
  if (!r) rules.set(current, (r = new Intl.PluralRules(current)));
  const k = r.select(n);
  return forms[k] ?? forms.other ?? forms.many ?? forms.one ?? "";
}

export const fmtDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" }) =>
  new Date(iso).toLocaleDateString(current, opts);
export const fmtDateTime = (iso: string) => new Date(iso).toLocaleString(current);
