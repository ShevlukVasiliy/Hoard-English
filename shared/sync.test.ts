import { expect, test } from "bun:test";
import { derive, mergeEvents, nextId, type EventBody, type JournalEvent } from "./journal";
import { LESSONS } from "./lessons";
import { pairCode, readPairCode, sync, SyncError, type SyncConfig } from "./sync";

const lesson = LESSONS[0]!;

// Гист GitHub в памяти: GET/POST/PATCH как в API, большие файлы отдаются обрезанными.
function fakeGitHub(token = "t") {
  const gists = new Map<string, { id: string; description: string; files: Record<string, string> }>();
  let n = 0;
  const view = (g: { id: string; description: string; files: Record<string, string> }) => ({
    id: g.id, description: g.description,
    files: Object.fromEntries(Object.entries(g.files).map(([name, content]) => [name, content.length > 200
      ? { filename: name, truncated: true, content: content.slice(0, 200), raw_url: `raw://${g.id}/${name}` }
      : { filename: name, content }])),
  });
  const json = (x: unknown, status = 200) => new Response(JSON.stringify(x), { status });
  const http = async (url: string, init: RequestInit = {}) => {
    if (url.startsWith("raw://")) {
      const [, id, name] = url.match(/^raw:\/\/([^/]+)\/(.+)$/)!;
      return new Response(gists.get(id!)!.files[name!]);
    }
    if ((init.headers as Record<string, string>).Authorization !== `Bearer ${token}`) return json({}, 401);
    const path = url.replace("https://api.github.com", "");
    const body = init.body ? JSON.parse(String(init.body)) : undefined;
    if (path.startsWith("/gists?")) return json([...gists.values()].map(view));
    if (path === "/gists" && init.method === "POST") {
      const g = { id: `g${++n}`, description: body.description, files: Object.fromEntries(Object.entries(body.files as Record<string, { content: string }>).map(([k, v]) => [k, v.content])) };
      gists.set(g.id, g);
      return json(view(g), 201);
    }
    const id = path.slice("/gists/".length);
    const g = gists.get(id);
    if (!g) return json({}, 404);
    if (init.method === "PATCH") for (const [k, v] of Object.entries(body.files as Record<string, { content: string }>)) g.files[k] = v.content;
    return json(view(g));
  };
  return { http, gists };
}

function device(name: string, gh: ReturnType<typeof fakeGitHub>, extra: Partial<SyncConfig> = {}) {
  let events: JournalEvent[] = [];
  const cfg: SyncConfig = { device: name, token: "t", ...extra };
  return {
    cfg,
    get events() { return events; },
    add(body: EventBody, at: string) { events = mergeEvents(events, [{ ...body, id: nextId(events, name), at } as JournalEvent]); },
    async sync(words?: { syncedAt: string; deck: string; words: [] }) {
      const r = await sync(cfg, { events, words, ownsWords: name === "mac" }, gh.http);
      cfg.gistId = r.gistId;
      events = r.events;
      return r;
    },
  };
}

const lessonEv = (correct: boolean): EventBody => ({ t: "lesson", lessonId: lesson.id, topic: lesson.topic, answers: [{ exerciseId: "e1", correct, given: "x" }] });

test("два устройства сходятся к одному журналу; повторная синхронизация ничего не пишет", async () => {
  const gh = fakeGitHub();
  const mac = device("mac", gh), phone = device("phone", gh);
  mac.add(lessonEv(true), "2026-10-21T10:00:00.000Z");
  await mac.sync();
  phone.add(lessonEv(false), "2026-10-21T11:00:00.000Z");
  const first = await phone.sync();
  expect(first.gistId).toBe(mac.cfg.gistId!);
  await mac.sync();
  expect(mac.events).toEqual(phone.events);
  expect(derive(mac.events).progress.lessons[lesson.id]!.attempts).toBe(2);
  expect((await mac.sync()).written).toBe(0);
  expect((await phone.sync()).written).toBe(0);
  expect(gh.gists.size).toBe(1);
});

test("устройство пишет только свои файлы, по месяцам", async () => {
  const gh = fakeGitHub();
  const mac = device("mac", gh), phone = device("phone", gh);
  mac.add(lessonEv(true), "2026-10-31T10:00:00.000Z");
  mac.add(lessonEv(true), "2026-11-01T10:00:00.000Z");
  await mac.sync();
  phone.add({ t: "activity" }, "2026-11-02T10:00:00.000Z");
  await phone.sync();
  expect(Object.keys(gh.gists.get(mac.cfg.gistId!)!.files).sort()).toEqual(["ev-mac-2026-10.json", "ev-mac-2026-11.json", "ev-phone-2026-11.json", "hoard.json"]);
});

test("пропавший в гисте файл восстанавливается из локального журнала", async () => {
  const gh = fakeGitHub();
  const mac = device("mac", gh);
  mac.add(lessonEv(true), "2026-10-21T10:00:00.000Z");
  await mac.sync();
  delete gh.gists.get(mac.cfg.gistId!)!.files["ev-mac-2026-10.json"];
  expect((await mac.sync()).written).toBe(1);
});

test("шифрование: в гисте нет открытого текста, второе устройство читает с паролем", async () => {
  const gh = fakeGitHub();
  const mac = device("mac", gh, { password: "секрет" });
  mac.add({ t: "highlight", item: { id: "a", lessonId: lesson.id, part: "theory:0", start: 0, text: "приватная заметка", createdAt: "2026-10-21T10:00:00.000Z" }, replaces: [] }, "2026-10-21T10:00:00.000Z");
  await mac.sync();
  const raw = JSON.stringify(gh.gists.get(mac.cfg.gistId!)!.files);
  expect(raw).not.toContain("приватная");
  expect(raw).not.toContain(lesson.id);

  const phone = device("phone", gh, { gistId: mac.cfg.gistId, password: "секрет" });
  await phone.sync();
  expect(derive(phone.events).highlights[0]!.text).toBe("приватная заметка");

  const wrong = device("phone2", gh, { gistId: mac.cfg.gistId, password: "не тот" });
  await expect(wrong.sync()).rejects.toThrow("неверный пароль");
  const none = device("phone3", gh, { gistId: mac.cfg.gistId });
  await expect(none.sync()).rejects.toThrow("введите пароль");
});

test("словарь: выгружает Mac, телефон получает более свежий", async () => {
  const gh = fakeGitHub();
  const mac = device("mac", gh), phone = device("phone", gh);
  await mac.sync({ syncedAt: "2026-10-21T10:00:00.000Z", deck: "english", words: [] });
  const r = await phone.sync();
  expect(r.words?.syncedAt).toBe("2026-10-21T10:00:00.000Z");
  expect((await phone.sync({ syncedAt: "2026-10-21T10:00:00.000Z", deck: "english", words: [] })).words).toBeUndefined();
});

test("ошибки: чужой токен и нет сети", async () => {
  const gh = fakeGitHub("другой");
  await expect(device("mac", gh).sync()).rejects.toThrow("токен");
  const offline = await sync({ device: "mac", token: "t" }, { events: [], ownsWords: true }, async () => { throw new TypeError("Load failed"); }).catch((e) => e);
  expect(offline).toBeInstanceOf(SyncError);
  expect((offline as SyncError).offline).toBe(true);
});

test("код подключения", () => {
  const c = { token: "ghp_x", gistId: "abc", password: "пароль" };
  expect(readPairCode(pairCode(c))).toEqual(c);
  expect(readPairCode("мусор")).toBeUndefined();
});
