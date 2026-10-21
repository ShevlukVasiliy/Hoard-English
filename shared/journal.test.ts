import { expect, test } from "bun:test";
import { derive, mergeEvents, nextId, seedEvents, type JournalEvent, type EventBody } from "./journal";
import { LESSONS } from "./lessons";
import { recordLesson } from "./progress";
import type { Highlight } from "./types";
import { EMPTY_PROGRESS } from "./types";

const lesson = LESSONS[0]!;
const at = (min: number) => new Date(Date.UTC(2026, 9, 21, 10, min)).toISOString();

// Устройство дописывает события в свой журнал, как это делает приложение.
function device(name: string) {
  let events: JournalEvent[] = [];
  return {
    get events() { return events; },
    add(body: EventBody, min: number) { events = mergeEvents(events, [{ ...body, id: nextId(events, name), at: at(min) } as JournalEvent]); },
    // синхронизация: забрать чужие события
    pull(...others: JournalEvent[][]) { events = mergeEvents(events, ...others); },
  };
}

const lessonEv = (correct: boolean): EventBody => ({ t: "lesson", lessonId: lesson.id, topic: lesson.topic, answers: [{ exerciseId: "e1", correct, given: "x" }] });
const note = (id: string, text: string): Highlight => ({ id, lessonId: lesson.id, part: "theory:0", start: 0, text, createdAt: at(0) });

test("результат не зависит от порядка синхронизации и повторной синхронизации", () => {
  const mac = device("mac"), phone = device("phone");
  mac.add(lessonEv(false), 1);
  phone.add(lessonEv(true), 2);
  mac.add({ t: "activity" }, 3);
  const a = mergeEvents(mac.events, phone.events);
  const b = mergeEvents(phone.events, mac.events);
  const c = mergeEvents(a, b, mac.events, phone.events);
  expect(a).toEqual(b);
  expect(c).toEqual(a);
  expect(derive(a)).toEqual(derive(c));
});

test("пересчёт совпадает с работой на одном устройстве", () => {
  const mac = device("mac"), phone = device("phone");
  mac.add(lessonEv(false), 1);
  phone.add(lessonEv(true), 5);
  mac.pull(phone.events);
  const single = recordLesson(recordLesson(EMPTY_PROGRESS, lesson, [{ exerciseId: "e1", correct: false, given: "x" }], at(1)), lesson, [{ exerciseId: "e1", correct: true, given: "x" }], at(5));
  expect(derive(mac.events).progress).toEqual(single);
});

test("попытки не удваиваются, сколько ни синхронизируй", () => {
  const mac = device("mac"), phone = device("phone");
  mac.add(lessonEv(true), 1);
  phone.add(lessonEv(true), 2);
  for (let i = 0; i < 3; i++) { mac.pull(phone.events); phone.pull(mac.events); }
  expect(derive(mac.events).progress.lessons[lesson.id]!.attempts).toBe(2);
  expect(derive(phone.events)).toEqual(derive(mac.events));
});

test("неделя офлайн: события телефона встают на свои места по времени", () => {
  const mac = device("mac"), phone = device("phone");
  phone.add(lessonEv(false), 1);
  mac.add(lessonEv(true), 2);
  phone.add({ t: "activity" }, 3);
  mac.pull(phone.events);
  const p = derive(mac.events).progress;
  expect(p.lessons[lesson.id]!.attempts).toBe(2);
  expect(p.activity).toEqual([at(1), at(2), at(3)]);
});

test("ошибка, ушедшая из повторов на телефоне, не возвращается с Mac", () => {
  const mac = device("mac"), phone = device("phone");
  mac.add(lessonEv(false), 1);
  phone.pull(mac.events);
  for (let i = 0; i < 5; i++)
    phone.add({ t: "review", lessonId: lesson.id, exerciseId: "e1", correct: true, given: "x" }, 10 + i);
  expect(derive(phone.events).progress.reviews).toHaveLength(0);
  mac.pull(phone.events);
  expect(derive(mac.events).progress.reviews).toHaveLength(0);
});

test("ответ на повтор, которого уже нет, ничего не ломает", () => {
  const mac = device("mac");
  mac.add({ t: "review", lessonId: "нет-такого", exerciseId: "e1", correct: true, given: "x" }, 1);
  expect(derive(mac.events).progress).toEqual(EMPTY_PROGRESS);
});

test("удалённая заметка не воскресает, склеенные заметки не дублируются", () => {
  const mac = device("mac"), phone = device("phone");
  mac.add({ t: "highlight", item: note("a", "one"), replaces: [] }, 1);
  mac.add({ t: "highlight", item: note("b", "two"), replaces: [] }, 2);
  phone.pull(mac.events);
  phone.add({ t: "unhighlight", noteId: "a" }, 3);
  mac.add({ t: "highlight", item: note("c", "two three"), replaces: ["b"] }, 4);
  mac.pull(phone.events);
  phone.pull(mac.events);
  expect(derive(mac.events).highlights.map((h) => h.id)).toEqual(["c"]);
  expect(derive(phone.events).highlights.map((h) => h.id)).toEqual(["c"]);
});

test("очередь Anki: отправленное с Mac уходит из очереди на телефоне", () => {
  const mac = device("mac"), phone = device("phone");
  phone.add({ t: "ankiQueue", item: { front: "hoard", back: "x", source: "lesson", addedAt: at(1) } }, 1);
  mac.pull(phone.events);
  const [item] = derive(mac.events).queue;
  expect(item!.id).toBe("phone.1");
  mac.add({ t: "ankiSent", ids: [item!.id!] }, 2);
  phone.pull(mac.events);
  expect(derive(phone.events).queue).toEqual([]);
});

test("общая настройка: побеждает последняя по времени", () => {
  const mac = device("mac"), phone = device("phone");
  phone.add({ t: "setting", key: "theme", value: "dark" }, 2);
  mac.add({ t: "setting", key: "theme", value: "light" }, 1);
  mac.pull(phone.events);
  expect(derive(mac.events).shared.theme).toBe("dark");
});

test("события из новой версии хранятся и пропускаются", () => {
  const mac = device("mac");
  const future = { id: "phone.1", at: at(1), t: "что-то-новое", data: 1 } as unknown as JournalEvent;
  mac.pull([future]);
  mac.add(lessonEv(true), 2);
  expect(mac.events.map((e) => e.id)).toEqual(["phone.1", "mac.1"]);
  expect(derive(mac.events).progress.lessons[lesson.id]!.attempts).toBe(1);
});

test("урок, которого больше нет в контенте, пересчитывается без падения", () => {
  const mac = device("mac");
  mac.add({ t: "lesson", lessonId: "удалённый", topic: "старая-тема", answers: [{ exerciseId: "x", correct: true, given: "y" }] }, 1);
  expect(derive(mac.events).progress.lessons["удалённый"]!.attempts).toBe(1);
});

test("стартовые снимки двух устройств сливаются по полям", () => {
  const macP = recordLesson(EMPTY_PROGRESS, lesson, [{ exerciseId: "e1", correct: false, given: "x" }], at(1));
  const other = LESSONS[1]!;
  const phoneP = recordLesson(EMPTY_PROGRESS, other, [{ exerciseId: "e2", correct: true, given: "x" }], at(2));
  const mac = seedEvents("mac", at(10), macP, [note("a", "one")], []);
  const phone = seedEvents("phone", at(11), phoneP, [], [{ front: "w", back: "b", source: "lesson", addedAt: at(0) }]);
  const d = derive(mergeEvents(mac, phone));
  expect(Object.keys(d.progress.lessons).sort()).toEqual([lesson.id, other.id].sort());
  expect(d.progress.reviews).toHaveLength(1);
  expect(d.highlights.map((h) => h.id)).toEqual(["a"]);
  expect(d.queue.map((q) => q.front)).toEqual(["w"]);
});

test("пустой прогресс не создаёт снимка", () => {
  expect(seedEvents("mac", at(0), EMPTY_PROGRESS, [], [])).toEqual([]);
});

test("снимок до журнала + новые уроки после него", () => {
  const before = recordLesson(EMPTY_PROGRESS, lesson, [{ exerciseId: "e1", correct: true, given: "x" }], at(1));
  const mac = device("mac");
  mac.pull(seedEvents("mac", at(5), before, [], []));
  mac.add(lessonEv(true), 6);
  expect(mac.events.map((e) => e.id)).toEqual(["mac.1", "mac.2"]);
  expect(derive(mac.events).progress.lessons[lesson.id]!.attempts).toBe(2);
});
