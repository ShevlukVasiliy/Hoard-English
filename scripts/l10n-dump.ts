// bun scripts/l10n-dump.ts <lessonId...> — русский контент урока в форме оверлея: только строки с кириллицей.
import { getLesson } from "../shared/lessons";
const cyr = /[а-яё]/i;
const has = (s?: string) => !!s && cyr.test(s);
for (const id of process.argv.slice(2)) {
  const l = getLesson(id)!;
  const o: any = {};
  if (has(l.title)) o.title = l.title;
  if (has(l.subtitle)) o.subtitle = l.subtitle;
  o.theory = l.theory.map((b) => {
    const t: any = {};
    for (const k of ["title", "text", "more", "why", "trap"] as const) if (has(b[k])) t[k] = b[k];
    if (b.examples?.some((e) => has(e.ru))) t.examples = b.examples.map((e) => (has(e.ru) ? `${e.en} || ${e.ru}` : undefined));
    return t;
  });
  const explain: any = {}, prompt: any = {}, task: any = {}, ctx: any = {};
  for (const e of l.exercises) {
    if (has(e.explain)) { explain[e.id] = e.explain; ctx[e.id] = (e as any).prompt ?? (e as any).source; }
    if ("prompt" in e && has(e.prompt)) prompt[e.id] = e.prompt;
    if (e.kind === "transform" && has(e.task)) task[e.id] = e.task;
    if (e.kind === "gap" && has(e.hint)) task[e.id] = "hint: " + e.hint;
  }
  o.explain = explain; o.exCtx = ctx; if (Object.keys(prompt).length) o.prompt = prompt; if (Object.keys(task).length) o.phrases = task;
  if (l.story) { const s: any = {}; for (const k of ["title", "text", "long", "takeaway", "question"] as const) if (has(l.story[k])) s[k] = l.story[k]; o.story = s; }
  console.log(`=== ${id} (${l.level}) ${l.title}`);
  console.log(JSON.stringify(o, null, 1));
}
