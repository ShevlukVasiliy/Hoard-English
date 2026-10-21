import { afterEach, expect, test } from "bun:test";
import { checkAnswer } from "./check";
import { setLang, T } from "./i18n";
import { detectLang, LANGS } from "./i18n/lang";
import { BLOCKS, getLesson, LESSONS } from "./lessons";
import { applyContentLang, CONTENT, contentStrings } from "./lessons/l10n";
import { TRAPS } from "./lessons/traps";

const cyr = /[а-яё]/i;
const others = LANGS.map((l) => l.id).filter((l) => l !== "ru");

afterEach(() => { setLang("ru"); applyContentLang("ru"); });

for (const lang of others) {
  test(`${lang}: весь русский контент заменён`, () => {
    applyContentLang("ru");
    const ru = new Map(contentStrings().map((s) => [s.path, s.value]));
    applyContentLang(lang);
    const missing = contentStrings().filter((s) => cyr.test(s.value) && ru.get(s.path) === s.value).map((s) => s.path);
    expect(missing).toEqual([]);
  });

  test(`${lang}: оверлей ссылается на существующие уроки, блоки и задания`, () => {
    const c = CONTENT[lang]!;
    const stale: string[] = [];
    for (const [id, o] of Object.entries(c.lessons)) {
      const l = getLesson(id);
      if (!l) { stale.push(id); continue; }
      if ((o.theory?.length ?? 0) > l.theory.length) stale.push(`${id}: theory ${o.theory!.length} > ${l.theory.length}`);
      o.theory?.forEach((t, i) => {
        if ((t.examples?.length ?? 0) > (l.theory[i]?.examples?.length ?? 0)) stale.push(`${id}: theory[${i}].examples`);
      });
      for (const ex of [...Object.keys(o.explain ?? {}), ...Object.keys(o.prompt ?? {}), ...Object.keys(o.options ?? {})])
        if (!l.exercises.some((e) => e.id === ex)) stale.push(`${id}/${ex}`);
      if (o.story && !l.story) stale.push(`${id}: story`);
    }
    for (const id of Object.keys(c.blocks)) if (!BLOCKS.some((b) => b.id === id)) stale.push(`block:${id}`);
    for (const [b, m] of Object.entries(c.traps ?? {}))
      for (const ex of Object.keys(m)) if (!TRAPS[b]?.some((e) => e.id === ex)) stale.push(`traps:${b}/${ex}`);
    expect(stale).toEqual([]);
  });

  test(`${lang}: свои ловушки с уникальными id и на английском`, () => {
    applyContentLang("ru");
    for (const [b, list] of Object.entries(CONTENT[lang]!.extraTraps ?? {})) {
      const ids = [...(TRAPS[b] ?? []), ...list].map((e) => e.id);
      expect(new Set(ids).size, b).toBe(ids.length);
      for (const e of list) {
        if ("prompt" in e && e.prompt) expect(cyr.test(e.prompt), `${b}/${e.id}`).toBe(false);
        if (e.kind === "fix") expect(checkAnswer(e, e.prompt), `${b}/${e.id}: ошибка засчитывается`).toBe(false);
        if (e.kind === "fix") for (const a of e.answers) expect(checkAnswer(e, a), `${b}/${e.id}: ${a}`).toBe(true);
      }
    }
  });
}

test("смена языка меняет строки и возвращает русский контент", () => {
  const lesson = LESSONS.find((l) => l.level === "A1")!;
  const ruText = lesson.theory[0]!.text;
  setLang("es");
  expect(T.tabs.home).toBe("Inicio");
  setLang("ru");
  expect(T.tabs.home).toBe("Главная");
  expect(lesson.theory[0]!.text).toBe(ruText);
});

test("язык системы: поддержанный — он, остальные — русский", () => {
  expect(detectLang(["uk-UA", "en"])).toBe("ru");
  expect(detectLang(["es-MX"])).toBe("es");
  expect(detectLang(["en-US", "de-AT"])).toBe("de");
  expect(detectLang(["fr-FR"])).toBe("ru");
});
