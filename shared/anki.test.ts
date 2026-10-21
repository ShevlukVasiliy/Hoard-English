import { expect, test } from "bun:test";
import { cleanField, deckPractice, grammarInCards } from "./anki";
import { checkAnswer } from "./check";
import { comparative, verbForms } from "./dict";
import type { AnkiWord } from "./types";

const card = (front: string, back = "", lapses = 0): AnkiWord => ({ front, back, lapses, ivl: 10, reps: 3 });

test("очистка полей", () => {
  expect(cleanField("I&#x27;m <b>here</b>&nbsp;now<br>ok")).toBe("I'm here now ok");
});

test("словарь", () => {
  expect(comparative("big")).toEqual(["bigger", "biggest"]);
  expect(comparative("good")).toEqual(["better", "best"]);
  expect(comparative("extensive", true)).toEqual(["more extensive", "most extensive"]);
  expect(comparative("tight", true)).toEqual(["tighter", "tightest"]);
  expect(comparative("raised", true)).toBeNull();
  expect(verbForms("blow")).toEqual(["blow", "blew", "blown"]);
  expect(verbForms("stop")).toEqual(["stop", "stopped", "stopped"]);
  expect(verbForms("study")).toEqual(["study", "studied", "studied"]);
});

test("шаблоны находят грамматику в карточках", () => {
  const found = grammarInCards([card("It will draw many eyes"), card("The bridge was built in 1890"), card("If I had known, I would have come")]);
  const ids = found.map((f) => f.lessonId);
  expect(ids).toContain("future-forms");
  expect(ids).toContain("passive-voice");
  expect(ids).toContain("conditionals-3-mixed");
});

test("задания из колоды решаются эталонным ответом, проблемные карточки чаще", () => {
  const deck = [card("extensive", "обширный"), card("blow up", "взрывать"), card("You pulled it off", "ты справился"), card("I have never been so insulted", "меня так не оскорбляли"), card("thumb", "большой палец")];
  const tasks = deckPractice(deck, 10);
  expect(tasks.some((t) => t.card.front === "thumb")).toBe(false);
  for (const t of tasks) {
    const ex = t.ex;
    const given = ex.kind === "order" ? ex.answer : ex.kind === "gap" ? ex.answers[0]! : "";
    expect(checkAnswer(ex, given), t.kind).toBe(true);
  }
  const hard = card("tight", "тугой", 9);
  let hits = 0;
  for (let i = 0; i < 200; i++) if (deckPractice([...deck, hard], 2).some((t) => t.card === hard)) hits++;
  expect(hits).toBeGreaterThan(100);
});

test("CEFR-J: части речи решают, где строить сравнительную степень", async () => {
  const { vocab } = await import("./vocab");
  expect(vocab("abandoned")?.pos).toContain("adjective");
  expect(vocab("abandoned")?.level).toBe("B2");
  const tasks = deckPractice([card("thumb", "большой палецый"), card("abandoned", "заброшенный")], 10);
  const kinds = tasks.filter((t) => t.kind === "comparative").map((t) => t.card.front);
  expect(kinds).toEqual(["abandoned"]);
});
