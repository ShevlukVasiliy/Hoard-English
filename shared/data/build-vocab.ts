// Конвертирует CEFR-J Vocabulary Profile (CSV) в компактный JSON: [слово, часть речи, уровень].
// Источник: The CEFR-J Wordlist Version 1.5, Yukio Tono, Tokyo University of Foreign Studies.
// Запуск: bun shared/data/build-vocab.ts
const csv = await Bun.file(new URL("./cefrj-vocabulary-profile-1.5.csv", import.meta.url)).text();
const rows: [string, string, string][] = [];
for (const line of csv.split(/\r?\n/).slice(1)) {
  if (!line.trim()) continue;
  const [head, pos, level] = line.split(",");
  if (!head || !pos || !level) continue;
  // «a.m./A.M./am/AM» — варианты написания через слеш
  for (const w of new Set(head.split("/").map((s) => s.trim().toLowerCase()).filter(Boolean))) rows.push([w, pos.trim(), level.trim()]);
}
await Bun.write(new URL("./vocab.json", import.meta.url), JSON.stringify(rows));
console.log(rows.length, "entries");
