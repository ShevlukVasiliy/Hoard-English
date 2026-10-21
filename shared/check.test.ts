import { expect, test } from "bun:test";
import { checkAnswer, matches, normalize } from "./check";
import { LESSONS } from "./lessons";
import { theoryLang } from "./types";

test("normalize", () => {
  expect(normalize("  I’m   Staying. ")).toBe("i'm staying");
  expect(normalize("Hello ,world!")).toBe("hello, world");
});

test("сокращения", () => {
  expect(matches("I'm staying", ["am staying"])).toBe(false); // лишнее слово
  expect(matches("I’m staying", ["i am staying"])).toBe(true);
  expect(matches("she's lived", ["has lived"])).toBe(false);
  expect(matches("she's lived", ["she has lived"])).toBe(true);
  expect(matches("He doesn't know", ["He does not know."])).toBe(true);
  expect(matches("I can't", ["I cannot"])).toBe(true);
  expect(matches("I'd left", ["I had left"])).toBe(true);
  expect(matches("I'd go", ["I would go"])).toBe(true);
});

test("неверные ответы не проходят", () => {
  expect(matches("leave", ["leaves"])).toBe(false);
  expect(matches("", ["leaves"])).toBe(false);
});

test("эталонные ответы всех уроков проходят проверку", () => {
  for (const l of LESSONS)
    for (const ex of l.exercises) {
      const given = ex.kind === "choice" ? String(ex.answer) : ex.kind === "order" ? ex.answer : ex.answers[0]!;
      expect(checkAnswer(ex, given), `${l.id}/${ex.id}`).toBe(true);
    }
});

test("каталог согласован", async () => {
  const { validateCatalog } = await import("./lessons");
  expect(validateCatalog()).toEqual([]);
});

test("все варианты ответов проходят, исходник fix и transform — нет", () => {
  for (const l of LESSONS)
    for (const ex of l.exercises) {
      if (ex.kind === "gap" || ex.kind === "fix" || ex.kind === "transform")
        for (const a of ex.answers) expect(checkAnswer(ex, a), `${l.id}/${ex.id}: ${a}`).toBe(true);
      if (ex.kind === "fix") expect(checkAnswer(ex, ex.prompt), `${l.id}/${ex.id}`).toBe(false);
      if (ex.kind === "transform") expect(checkAnswer(ex, ex.source), `${l.id}/${ex.id}`).toBe(false);
    }
});

test("язык теории и историй зависит от уровня, ловушки по-русски", () => {
  const cyr = /[а-яё]/i;
  for (const l of LESSONS) {
    const ru = theoryLang(l.level) === "native";
    const texts = [...l.theory.map((b) => b.text + (b.title ?? "")), l.subtitle, l.story?.text ?? ""];
    if (!ru) for (const t of texts) expect(cyr.test(t.replace(/«[^»]*»/g, "")), `${l.id}: ${t.slice(0, 40)}`).toBe(false);
    else expect(texts.some((t) => cyr.test(t)), l.id).toBe(true);
    for (const b of l.theory) if (b.trap) expect(cyr.test(b.trap), `${l.id} trap`).toBe(true);
  }
});
