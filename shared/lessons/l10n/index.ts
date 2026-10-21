// Контент под родной язык ученика.
//
// Эталон — русский текст в файлах уроков. Для другого языка оверлей подменяет
// поля прямо в объектах каталога (LESSONS, BLOCKS, TRAPS, PLACEMENT_BANK):
// все ссылки на уроки и задания остаются прежними, а смена языка — это
// «вернуть русское, наложить новый оверлей». Пересчёт прогресса от языка не зависит.
//
// Оверлей пишется под язык, а не переводится: ловушки — ошибки носителей
// именно этого языка, глоссы «Почему так?» сравнивают с ним, а не с русским.
import type { Lang } from "../../i18n/lang";
import { PLACEMENT_BANK } from "../../placement";
import type { Exercise } from "../../types";
import { BLOCKS, LESSONS } from "../index";
import { TRAPS } from "../traps";
import { de } from "./de";
import { es } from "./es";
import { pl } from "./pl";

export type TheoryL10n = {
  title?: string;
  text?: string;
  more?: string;
  why?: string;
  trap?: string;
  // переводы примеров по порядку; undefined — у примера нет перевода
  examples?: (string | undefined)[];
};

export type StoryL10n = { title?: string; text?: string; long?: string; takeaway?: string; question?: string };

export type LessonL10n = {
  title?: string;
  subtitle?: string;
  // по порядку блоков теории
  theory?: TheoryL10n[];
  // разбор заданий по id
  explain?: Record<string, string>;
  // условие, если в нём есть родной язык (gap с переводом в скобках и т. п.), по id
  prompt?: Record<string, string>;
  // варианты ответа, если они на родном языке, по id
  options?: Record<string, string[]>;
  story?: StoryL10n;
};

export type ContentL10n = {
  lessons: Record<string, LessonL10n>;
  // названия блоков по id
  blocks: Record<string, string>;
  // разбор заданий «ловушек»: id блока → id задания → текст
  traps?: Record<string, Record<string, string>>;
  // свои ловушки этого языка: добавляются к общим ловушкам блока
  extraTraps?: Record<string, Exercise[]>;
  // повторяющиеся короткие строки (инструкции трансформаций, подсказки): русский текст → свой
  phrases: Record<string, string>;
};

export const CONTENT: Partial<Record<Lang, ContentL10n>> = { es, de, pl };

// Исходные значения подменённых полей: объект → поле → русский текст.
const base = new Map<object, Record<string, unknown>>();

function put<T extends object>(obj: T, key: keyof T & string, value: unknown) {
  if (value === undefined) return;
  let b = base.get(obj);
  if (!b) base.set(obj, (b = {}));
  if (!(key in b)) b[key] = obj[key];
  (obj as Record<string, unknown>)[key] = value;
}

function restore() {
  for (const [obj, fields] of base) Object.assign(obj, fields);
}

function exercise(ex: Exercise, c: ContentL10n, explain?: string, prompt?: string, options?: string[]) {
  put(ex, "explain", explain);
  if (prompt !== undefined) put(ex, "prompt" as keyof Exercise & string, prompt);
  if (options && ex.kind === "choice") put(ex, "options", options);
  if (ex.kind === "transform") put(ex, "task", c.phrases[ex.task]);
  if (ex.kind === "gap" && ex.hint) put(ex, "hint", c.phrases[ex.hint]);
  if (ex.kind === "order" && ex.prompt && c.phrases[ex.prompt]) put(ex, "prompt", c.phrases[ex.prompt]);
}

export function applyContentLang(lang: Lang) {
  restore();
  const c = CONTENT[lang];
  if (lang === "ru" || !c) return;

  for (const l of LESSONS) {
    const o = c.lessons[l.id];
    if (o) {
      put(l, "title", o.title);
      put(l, "subtitle", o.subtitle);
      l.theory.forEach((b, i) => {
        const t = o.theory?.[i];
        if (!t) return;
        put(b, "title", t.title);
        put(b, "text", t.text);
        put(b, "more", t.more);
        put(b, "why", t.why);
        put(b, "trap", t.trap);
        b.examples?.forEach((e, j) => put(e, "ru", t.examples?.[j]));
      });
      if (l.story && o.story) for (const k of ["title", "text", "long", "takeaway", "question"] as const) put(l.story, k, o.story[k]);
    }
    for (const ex of l.exercises) exercise(ex, c, o?.explain?.[ex.id], o?.prompt?.[ex.id], o?.options?.[ex.id]);
  }

  for (const b of BLOCKS) put(b, "title", c.blocks[b.id]);

  for (const [blockId, list] of Object.entries(TRAPS)) {
    for (const ex of list) exercise(ex, c, c.traps?.[blockId]?.[ex.id]);
    const extra = c.extraTraps?.[blockId];
    if (extra?.length) put(TRAPS, blockId, [...list, ...extra]);
  }

  for (const p of PLACEMENT_BANK) exercise(p.ex, c);
}

// Для тестов: все строки контента с путём, чтобы найти непереведённые.
export function contentStrings(): { path: string; value: string }[] {
  const out: { path: string; value: string }[] = [];
  const walk = (path: string, v: unknown) => {
    if (typeof v === "string") out.push({ path, value: v });
    else if (Array.isArray(v)) v.forEach((x, i) => walk(`${path}[${i}]`, x));
    else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(`${path}.${k}`, x);
  };
  LESSONS.forEach((l) => walk(l.id, l));
  BLOCKS.forEach((b) => walk(`block:${b.id}`, b.title));
  Object.entries(TRAPS).forEach(([id, list]) => walk(`traps:${id}`, list));
  PLACEMENT_BANK.forEach((p) => walk(`placement:${p.ex.id}`, p.ex));
  return out;
}
