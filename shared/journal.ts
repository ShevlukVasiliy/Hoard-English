// Журнал действий — то, что синхронизируется между устройствами.
//
// Готовые файлы (progress.json, highlights.json) не сливаются: при слиянии они
// воскрешают удалённое, удваивают попытки и портят скользящую оценку тем.
// Вместо этого каждое действие — событие с уникальным id. Журналы устройств
// объединяются по id, а состояние вычисляется заново: события по времени
// проходят через те же функции, что и на одном устройстве.
//
// Правила:
// - событие хранит всё, что нужно для пересчёта, и не зависит от контента уроков;
// - пересчёт детерминирован: никаких случайных id и текущего времени внутри apply;
// - незнакомые события (из более новой версии) хранятся и пропускаются.
import { recordLesson, recordReview, type Answer } from "./progress";
import { applyTest, type TestInput } from "./tests";
import type { AnkiQueueItem, Highlight, Progress, Settings } from "./types";
import { EMPTY_PROGRESS } from "./types";

// Настройки, общие для всех устройств. Остальные (напоминания, Anki, автозапуск) — свои у каждого.
export const SHARED_SETTINGS = ["theme", "theoryDepth", "storyDepth", "lang"] as const;
export type SharedKey = (typeof SHARED_SETTINGS)[number];
export type SharedSettings = Partial<Pick<Settings, SharedKey>>;

export type EventBody =
  // стартовый снимок: прогресс, накопленный до журнала
  | { t: "seed"; progress: Progress; highlights: Highlight[] }
  | { t: "lesson"; lessonId: string; topic: string; answers: Answer[] }
  | { t: "review"; lessonId: string; exerciseId: string; correct: boolean; given: string }
  | ({ t: "test" } & TestInput)
  // занятие без записи результата (задания из колоды)
  | { t: "activity" }
  // заметка; replaces — склеенные с ней старые
  | { t: "highlight"; item: Highlight; replaces: string[] }
  | { t: "unhighlight"; noteId: string }
  | { t: "notesInAnki"; ids: string[] }
  | { t: "storiesInAnki"; ids: string[] }
  // слово ждёт отправки в Anki; id очереди — id события
  | { t: "ankiQueue"; item: Omit<AnkiQueueItem, "id"> }
  | { t: "ankiSent"; ids: string[] }
  | { t: "setting"; key: SharedKey; value: Settings[SharedKey] };

// id = «устройство.номер», at — ISO-время действия. Поля id и at в теле события запрещены.
export type JournalEvent = EventBody & { id: string; at: string };

export type Journal = { events: JournalEvent[] };

export type Derived = {
  progress: Progress;
  highlights: Highlight[];
  // очередь Anki: поставленное и ещё не отправленное
  queue: AnkiQueueItem[];
  shared: SharedSettings;
};

export const EMPTY_DERIVED: Derived = { progress: EMPTY_PROGRESS, highlights: [], queue: [], shared: {} };

const deviceOf = (id: string) => id.slice(0, id.lastIndexOf("."));
const seqOf = (id: string) => Number(id.slice(id.lastIndexOf(".") + 1));

// Порядок пересчёта: снимки первыми, потом по времени, при равном времени — по id.
export function compareEvents(a: JournalEvent, b: JournalEvent): number {
  const sa = a.t === "seed" ? 0 : 1, sb = b.t === "seed" ? 0 : 1;
  if (sa !== sb) return sa - sb;
  if (a.at !== b.at) return a.at < b.at ? -1 : 1;
  const da = deviceOf(a.id), db = deviceOf(b.id);
  if (da !== db) return da < db ? -1 : 1;
  return seqOf(a.id) - seqOf(b.id);
}

// Объединение журналов: одно событие не попадает дважды, порядок аргументов не важен.
export function mergeEvents(...lists: JournalEvent[][]): JournalEvent[] {
  const byId = new Map<string, JournalEvent>();
  for (const list of lists) for (const e of list) if (!byId.has(e.id)) byId.set(e.id, e);
  return [...byId.values()].sort(compareEvents);
}

// Следующий id события этого устройства.
export function nextId(events: JournalEvent[], device: string): string {
  let max = 0;
  for (const e of events) if (deviceOf(e.id) === device) max = Math.max(max, seqOf(e.id));
  return `${device}.${max + 1}`;
}

const union = <T>(a: T[], b: T[]) => [...new Set([...a, ...b])];
const later = <T extends object>(a: T | undefined, b: T | undefined, key: keyof T): T | undefined =>
  !a ? b : !b ? a : String(b[key]) > String(a[key]) ? b : a;

// Снимок вливается по полям: так два устройства с прогрессом до журнала ничего не теряют.
// На пустом состоянии это просто копия снимка.
export function absorbSnapshot(p: Progress, s: Progress): Progress {
  const lessons = { ...p.lessons };
  for (const [id, l] of Object.entries(s.lessons ?? {})) {
    const cur = lessons[id];
    lessons[id] = !cur ? l : {
      completedAt: cur.completedAt > l.completedAt ? cur.completedAt : l.completedAt,
      score: Math.max(cur.score, l.score),
      total: cur.completedAt > l.completedAt ? cur.total : l.total,
      attempts: Math.max(cur.attempts, l.attempts),
    };
  }
  const topics = { ...p.topics };
  for (const [id, t] of Object.entries(s.topics ?? {})) topics[id] = later(topics[id], t, "updatedAt")!;
  const reviewKey = (r: Progress["reviews"][number]) => `${r.lessonId}/${r.exerciseId}`;
  const reviews = new Map(p.reviews.map((r) => [reviewKey(r), r]));
  for (const r of s.reviews ?? []) reviews.set(reviewKey(r), later(reviews.get(reviewKey(r)), r, "firstAt")!);
  const testKey = (t: Progress["tests"][number]) => `${t.kind}/${t.at}`;
  const tests = new Map(p.tests.map((t) => [testKey(t), t]));
  for (const t of s.tests ?? []) if (!tests.has(testKey(t))) tests.set(testKey(t), t);
  return {
    ...p,
    level: later(p.level, s.level, "at"),
    lessons,
    topics,
    reviews: [...reviews.values()],
    tests: [...tests.values()].sort((a, b) => (a.at < b.at ? -1 : 1)),
    stories: union(p.stories, s.stories ?? []),
    storiesInAnki: union(p.storiesInAnki ?? [], s.storiesInAnki ?? []),
    activity: union(p.activity, s.activity ?? []).sort(),
  };
}

export function apply(d: Derived, e: JournalEvent): Derived {
  const p = d.progress;
  switch (e.t) {
    case "seed": {
      const ids = new Set(d.highlights.map((h) => h.id));
      return { ...d, progress: absorbSnapshot(p, e.progress), highlights: [...d.highlights, ...e.highlights.filter((h) => !ids.has(h.id))] };
    }
    case "lesson":
      return { ...d, progress: recordLesson(p, { id: e.lessonId, topic: e.topic }, e.answers, e.at) };
    case "review": {
      // ошибку могли уже убрать с очереди на другом устройстве — тогда ответ ничего не меняет
      const item = p.reviews.find((r) => r.lessonId === e.lessonId && r.exerciseId === e.exerciseId);
      return item ? { ...d, progress: recordReview(p, item, e.correct, e.given, e.at) } : d;
    }
    case "test":
      return { ...d, progress: applyTest(p, e, e.at) };
    case "activity":
      return { ...d, progress: { ...p, activity: [...p.activity, e.at] } };
    case "highlight": {
      const gone = new Set([...e.replaces, e.item.id]);
      return { ...d, highlights: [...d.highlights.filter((h) => !gone.has(h.id)), e.item] };
    }
    case "unhighlight":
      return { ...d, highlights: d.highlights.filter((h) => h.id !== e.noteId) };
    case "notesInAnki":
      return { ...d, highlights: d.highlights.map((h) => (e.ids.includes(h.id) ? { ...h, ankiAt: e.at } : h)) };
    case "storiesInAnki":
      return { ...d, progress: { ...p, storiesInAnki: union(p.storiesInAnki ?? [], e.ids) } };
    case "ankiQueue":
      return { ...d, queue: [...d.queue, { ...e.item, id: e.id }] };
    case "ankiSent":
      return { ...d, queue: d.queue.filter((q) => !e.ids.includes(q.id!)) };
    case "setting":
      return { ...d, shared: { ...d.shared, [e.key]: e.value } };
    default:
      // событие из более новой версии приложения
      return d;
  }
}

// Состояние из журнала. Событие, которое не удалось применить, пропускается, а не роняет пересчёт.
export function derive(events: JournalEvent[]): Derived {
  let d = EMPTY_DERIVED;
  for (const e of [...events].sort(compareEvents)) {
    try { d = apply(d, e); } catch { /* повреждённое или несовместимое событие */ }
  }
  // отправленное до того, как событие очереди пришло с другого устройства, тоже не в очереди
  const sent = new Set(events.flatMap((e) => (e.t === "ankiSent" ? e.ids : [])));
  return { ...d, queue: d.queue.filter((q) => !sent.has(q.id!)) };
}

// Стартовый снимок из файлов, накопленных до журнала. Пустой прогресс — без снимка.
export function seedEvents(device: string, at: string, progress: Progress, highlights: Highlight[], queue: AnkiQueueItem[]): JournalEvent[] {
  const out: JournalEvent[] = [];
  const empty = !Object.keys(progress.lessons).length && !progress.tests.length && !progress.activity.length && !highlights.length;
  if (!empty) out.push({ id: `${device}.${out.length + 1}`, at, t: "seed", progress, highlights });
  for (const { id: _id, ...item } of queue) out.push({ id: `${device}.${out.length + 1}`, at, t: "ankiQueue", item });
  return out;
}

export const monthOf = (at: string) => at.slice(0, 7);
export { deviceOf };
