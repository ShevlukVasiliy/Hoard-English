// Проверка одного файла оверлея: bun scripts/l10n-check.ts <lang> <file> <lessonId...>
// Показывает непереведённые русские строки этих уроков и ссылки на несуществующие задания.
import { getLesson } from "../shared/lessons";
import { applyContentLang, CONTENT, contentStrings, type LessonL10n } from "../shared/lessons/l10n";
import type { Lang } from "../shared/i18n/lang";

const [lang, file, ...ids] = process.argv.slice(2) as [Lang, string, ...string[]];
const mod = await import(`../shared/lessons/l10n/${lang}/${file}.ts`);
const lessons = Object.values(mod)[0] as Record<string, LessonL10n>;
const cyr = /[а-яё]/i;

applyContentLang("ru");
const ru = new Map(contentStrings().map((s) => [s.path, s.value]));
const c = CONTENT[lang]!;
CONTENT[lang] = { ...c, lessons: { ...c.lessons, ...lessons } };
applyContentLang(lang);
const missing = contentStrings()
  .filter((s) => ids.some((id) => s.path.startsWith(id + ".")) && cyr.test(s.value) && ru.get(s.path) === s.value)
  .map((s) => s.path);
const stale: string[] = [];
for (const [id, o] of Object.entries(lessons)) {
  const l = getLesson(id);
  if (!l) { stale.push(`нет урока ${id}`); continue; }
  if (!ids.includes(id)) stale.push(`урок ${id} не указан в аргументах`);
  o.theory?.forEach((t, i) => {
    if (!l.theory[i]) stale.push(`${id}: лишний theory[${i}]`);
    if ((t.examples?.length ?? 0) > (l.theory[i]?.examples?.length ?? 0)) stale.push(`${id}: theory[${i}].examples длиннее оригинала`);
  });
  for (const ex of [...Object.keys(o.explain ?? {}), ...Object.keys(o.prompt ?? {}), ...Object.keys(o.options ?? {})])
    if (!l.exercises.some((e) => e.id === ex)) stale.push(`${id}: нет задания ${ex}`);
}
applyContentLang("ru");
console.log(missing.length || stale.length ? { missing, stale } : "OK");
process.exit(missing.length || stale.length ? 1 : 0);
