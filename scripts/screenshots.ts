// Скриншоты для README: браузерная версия с демо-прогрессом, светлая и тёмная тема, телефон.
// Запуск: bun run dev, затем bun scripts/screenshots.ts [адрес] — картинки в docs/screenshots/.
// Нужен установленный Google Chrome.
import { chromium, type Page } from "playwright-core";
import { BLOCKS, LESSONS } from "../shared/lessons/index";
import type { JournalEvent } from "../shared/journal";
import { DEFAULT_SETTINGS, type Highlight } from "../shared/types";

const BASE = process.argv[2] ?? "http://localhost:1420/";
const OUT = new URL("../docs/screenshots/", import.meta.url).pathname;
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const DAY = 86_400_000;
const now = Date.parse("2026-10-21T19:00:00Z");
const iso = (daysAgo: number) => new Date(now - daysAgo * DAY).toISOString();

// Демо-ученик: первые шесть блоков пройдены за полтора месяца, ошибки примерно в каждом девятом задании.
function demoJournal(): JournalEvent[] {
  const events: JournalEvent[] = [];
  let n = 0;
  const id = () => `demo.${++n}`;
  const placement = LESSONS.filter((l) => l.level === "A2" || l.level === "B1").slice(0, 20).map((l, k) => ({ lessonId: l.id, topic: l.topic, exerciseId: l.exercises[0]!.id, correct: k % 4 !== 0, given: "" }));
  events.push({ id: id(), at: iso(48), t: "test", kind: "placement", level: "B1", answers: placement });
  const done = BLOCKS.slice(0, 6).flatMap((b) => b.lessonIds);
  done.forEach((lessonId, i) => {
    const l = LESSONS.find((x) => x.id === lessonId)!;
    const answers = l.exercises.slice(0, 10).map((e, k) => ({ exerciseId: e.id, correct: (k + i) % 9 !== 0, given: "" }));
    events.push({ id: id(), at: iso(45 - i * 3), t: "lesson", lessonId, topic: l.topic, answers });
  });
  const notes: [string, string][] = [
    ["present-perfect-past-simple", "have"],
    ["articles", "the"],
    ["to-be", "to be"],
    ["past-simple-basics", "-ed"],
  ];
  notes.forEach(([lessonId, word], i) => {
    const l = LESSONS.find((x) => x.id === lessonId)!;
    const k = l.theory.findIndex((t) => t.why);
    const part = k >= 0 ? `why:${k}` : "theory:0";
    const raw = (k >= 0 ? l.theory[k]!.why! : l.theory[0]!.text).replace(/[*`]/g, "");
    const sentence = raw.split(/(?<=[.!?])\s+/).find((s) => s.includes(word) && /[.!?»]$/.test(s) && s.length > 30 && s.length < 140) ?? raw.split(/(?<=[.!?])\s+/)[0]!;
    const item: Highlight = { id: `demo-note-${i}`, lessonId, part, start: raw.indexOf(sentence), text: sentence, createdAt: iso(20 - i * 4) };
    events.push({ id: id(), at: item.createdAt, t: "highlight", item, replaces: [] });
  });
  return events;
}

type Shot = { name: string; route?: object; scroll?: string; clicks?: string[]; height?: number; mobile?: boolean; lang?: string };
const SHOTS: Shot[] = [
  { name: "home" },
  { name: "map", route: { name: "map" } },
  { name: "lesson", route: { name: "lesson", id: "present-perfect-past-simple" } },
  { name: "gloss", route: { name: "lesson", id: "present-perfect-past-simple" }, scroll: ".trap, [data-part^='why']" },
  { name: "stories", route: { name: "stories" } },
  { name: "notes", route: { name: "notes" } },
  { name: "blitz", route: { name: "blitz" }, clicks: ["text=Начать"], height: 560 },
  { name: "traps", route: { name: "test", kind: "traps", blockId: "perfect" }, clicks: ["text=Начать", ".options button >> nth=1"], height: 640 },
  { name: "phone-home", mobile: true },
  // урок на других родных языках: ловушка и глосса под язык ученика
  ...(["es", "de", "pl"] as const).map((lang) => ({ name: `gloss-${lang}`, lang, route: { name: "lesson", id: "present-perfect-past-simple" }, scroll: ".trap, [data-part^='why']" })),
  { name: "phone-lesson", route: { name: "lesson", id: "articles" }, mobile: true },
];

async function seed(page: Page, lang?: string) {
  const settings = { ...DEFAULT_SETTINGS, onboarded: true, lang };
  await page.addInitScript(([events, settings]) => {
    localStorage.setItem("events.json", JSON.stringify({ events }));
    localStorage.setItem("settings.json", JSON.stringify(settings));
  }, [demoJournal(), settings] as const);
}

const browser = await chromium.launch({ executablePath: CHROME });
for (const scheme of ["light", "dark"] as const) {
  for (const s of SHOTS) {
    const ctx = await browser.newContext({
      colorScheme: scheme,
      viewport: s.mobile ? { width: 375, height: 812 } : { width: 1280, height: s.height ?? 820 },
      deviceScaleFactor: 2,
      isMobile: s.mobile,
      hasTouch: s.mobile,
    });
    const page = await ctx.newPage();
    await seed(page, s.lang);
    await page.goto(BASE + (s.route ? "#" + encodeURIComponent(JSON.stringify(s.route)) : ""));
    await page.waitForTimeout(800);
    for (const c of s.clicks ?? []) { await page.locator(c).first().click({ timeout: 3000 }).catch(() => {}); await page.waitForTimeout(600); }
    if (s.scroll) await page.locator(s.scroll).first().scrollIntoViewIfNeeded().catch(() => {});
    if (s.scroll) await page.mouse.wheel(0, 200);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}${s.name}-${scheme}.png` });
    await ctx.close();
  }
}
// Обложка README из готовых скриншотов
const hero = new URL("./hero.html", import.meta.url).href;
for (const theme of ["light", "dark"] as const) for (const lang of ["en", "ru"] as const) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(`${hero}?theme=${theme}&lang=${lang}`);
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}../hero-${lang}-${theme}.png` });
  await ctx.close();
}
await browser.close();
console.log("готово:", OUT);
