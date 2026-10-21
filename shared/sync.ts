// Синхронизация через secret-гист GitHub пользователя. Своего сервера нет.
//
// В гисте:
//   hoard.json              — маркер: версия, соль и проверка пароля, если гист зашифрован
//   ev-<устройство>-<месяц>.json — события журнала одного устройства за месяц
//   anki-words.json         — словарь колоды; пишет только Mac (там есть Anki)
// Каждое устройство пишет только свои файлы событий, поэтому одновременные
// синхронизации не перетирают друг друга. Свой журнал устройство хранит и локально:
// если файл в гисте пропал, он восстановится при следующей синхронизации.
import { decrypt, deriveKey, encrypt, isEnvelope, newSalt, type Envelope } from "./crypt";
import { deviceOf, mergeEvents, monthOf, type JournalEvent } from "./journal";
import type { AnkiWord } from "./types";

export const GIST_DESCRIPTION = "Hoard sync";
const MARKER = "hoard.json";
const WORDS = "anki-words.json";
const API = "https://api.github.com";

// Локальные настройки синхронизации (sync.json). Никогда не уходят в гист.
export type SyncConfig = {
  // id этого устройства в журнале
  device: string;
  token?: string;
  gistId?: string;
  // пароль шифрования; пусто — гист без шифрования
  password?: string;
  lastSync?: string;
};

export type WordsSnapshot = { syncedAt: string; deck: string; words: AnkiWord[] };

type Marker = { app: "hoard"; v: 1; salt?: string; check?: Envelope };

export type SyncResult = {
  gistId: string;
  events: JournalEvent[];
  // словарь из гиста, если он свежее локального
  words?: WordsSnapshot;
  // сколько файлов записано
  written: number;
};

// Ошибка без сети отличается от остальных: её показываем тихо.
export class SyncError extends Error {
  constructor(message: string, readonly offline = false) { super(message); }
}

type Http = (url: string, init?: RequestInit) => Promise<Response>;
type GistFile = { filename: string; content?: string; truncated?: boolean; raw_url?: string };
type Gist = { id: string; description: string | null; files: Record<string, GistFile | null> };

const eventsFile = (device: string, month: string) => `ev-${device}-${month}.json`;
const EVENTS_RE = /^ev-(.+)-(\d{4}-\d{2})\.json$/;

export const newDeviceId = () => Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => (b % 36).toString(36)).join("");

function client(token: string, http: Http) {
  const call = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
    let r: Response;
    try {
      r = await http(`${API}${path}`, {
        ...init,
        headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", ...(init.body ? { "Content-Type": "application/json" } : {}) },
      });
    } catch {
      throw new SyncError("нет связи с GitHub", true);
    }
    if (r.status === 401) throw new SyncError("GitHub не принял токен: проверьте его или создайте новый");
    if (r.status === 404) throw new SyncError("гист не найден: у токена нет доступа к гистам или гист удалён");
    if (r.status === 403 || r.status === 429) throw new SyncError("GitHub временно ограничил запросы, попробуйте позже");
    if (!r.ok) throw new SyncError(`GitHub ответил ${r.status}`);
    return r.json() as Promise<T>;
  };
  return {
    get: (id: string) => call<Gist>(`/gists/${id}`),
    list: () => call<Gist[]>(`/gists?per_page=100`),
    create: (files: Record<string, string>) => call<Gist>(`/gists`, {
      method: "POST",
      body: JSON.stringify({ description: GIST_DESCRIPTION, public: false, files: Object.fromEntries(Object.entries(files).map(([k, v]) => [k, { content: v }])) }),
    }),
    update: (id: string, files: Record<string, string>) => call<Gist>(`/gists/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ files: Object.fromEntries(Object.entries(files).map(([k, v]) => [k, { content: v }])) }),
    }),
    // большие файлы API отдаёт обрезанными — полный текст по raw_url
    async content(f: GistFile): Promise<string> {
      if (!f.truncated && f.content !== undefined) return f.content;
      if (!f.raw_url) throw new SyncError(`файл ${f.filename} не прочитан`);
      try {
        const r = await http(f.raw_url);
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      } catch {
        throw new SyncError(`файл ${f.filename} не прочитан`, true);
      }
    },
  };
}

const PASSWORD_CHECK = "hoard";

async function newMarker(password?: string): Promise<Marker> {
  if (!password) return { app: "hoard", v: 1 };
  const salt = newSalt();
  return { app: "hoard", v: 1, salt, check: await encrypt(await deriveKey(password, salt), PASSWORD_CHECK) };
}

// Ключ шифрования по маркеру гиста: проверяет, что пароль совпадает с тем, которым гист создан.
async function keyFor(marker: Marker, password?: string): Promise<CryptoKey | undefined> {
  if (!marker.salt || !marker.check) {
    if (password) throw new SyncError("гист создан без пароля: уберите пароль на этом устройстве или начните новый гист");
    return undefined;
  }
  if (!password) throw new SyncError("гист зашифрован: введите пароль");
  const key = await deriveKey(password, marker.salt);
  try {
    if ((await decrypt(key, marker.check)) === PASSWORD_CHECK) return key;
  } catch { /* неверный пароль */ }
  throw new SyncError("неверный пароль гиста");
}

async function pack(key: CryptoKey | undefined, value: unknown): Promise<string> {
  const json = JSON.stringify(value);
  return key ? JSON.stringify(await encrypt(key, json)) : json;
}

async function unpack<T>(key: CryptoKey | undefined, text: string): Promise<T> {
  const raw: unknown = JSON.parse(text);
  if (!isEnvelope(raw)) return raw as T;
  if (!key) throw new SyncError("в гисте зашифрованный файл, а пароль не задан");
  return JSON.parse(await decrypt(key, raw)) as T;
}

const sameIds = (a: JournalEvent[], b: JournalEvent[]) => {
  if (a.length !== b.length) return false;
  const ids = new Set(a.map((e) => e.id));
  return b.every((e) => ids.has(e.id));
};

export async function sync(
  cfg: SyncConfig,
  local: { events: JournalEvent[]; words?: WordsSnapshot; ownsWords: boolean },
  http: Http = (url, init) => fetch(url, init),
): Promise<SyncResult> {
  if (!cfg.token) throw new SyncError("не задан токен GitHub");
  const api = client(cfg.token, http);

  // гист: известный, найденный по описанию или новый
  let gist: Gist;
  if (cfg.gistId) gist = await api.get(cfg.gistId);
  else {
    const found = (await api.list()).find((g) => g.description === GIST_DESCRIPTION);
    gist = found ? await api.get(found.id) : await api.create({ [MARKER]: JSON.stringify(await newMarker(cfg.password)) });
  }

  const markerFile = gist.files[MARKER];
  if (!markerFile) throw new SyncError("это не гист Hoard: нет файла hoard.json");
  const marker = JSON.parse(await api.content(markerFile)) as Marker;
  const key = await keyFor(marker, cfg.password);

  // чужие и свои события из гиста
  const remote = new Map<string, JournalEvent[]>();
  for (const [name, f] of Object.entries(gist.files)) {
    if (!f || !EVENTS_RE.test(name)) continue;
    const list = await unpack<JournalEvent[]>(key, await api.content(f));
    if (Array.isArray(list)) remote.set(name, list);
  }
  const events = mergeEvents(local.events, ...remote.values());

  // свои файлы — только те месяцы, где в гисте не то же самое
  const write: Record<string, string> = {};
  const own = new Map<string, JournalEvent[]>();
  for (const e of events) {
    if (deviceOf(e.id) !== cfg.device) continue;
    const name = eventsFile(cfg.device, monthOf(e.at));
    own.set(name, [...(own.get(name) ?? []), e]);
  }
  for (const [name, list] of own) if (!sameIds(list, remote.get(name) ?? [])) write[name] = await pack(key, list);

  // словарь: свежий побеждает; выгружает только устройство с Anki
  let words: WordsSnapshot | undefined;
  const wf = gist.files[WORDS];
  const remoteWords = wf ? await unpack<WordsSnapshot>(key, await api.content(wf)) : undefined;
  if (local.ownsWords && local.words?.syncedAt && (!remoteWords || local.words.syncedAt > remoteWords.syncedAt))
    write[WORDS] = await pack(key, local.words);
  else if (remoteWords && (!local.words?.syncedAt || remoteWords.syncedAt > local.words.syncedAt))
    words = remoteWords;

  if (Object.keys(write).length) await api.update(gist.id, write);
  return { gistId: gist.id, events, words, written: Object.keys(write).length };
}

// Код подключения другого устройства: токен, гист и пароль одной строкой.
export type PairCode = { token: string; gistId: string; password?: string };

export const pairCode = (c: PairCode) => `hoard:${btoa(unescape(encodeURIComponent(JSON.stringify(c))))}`;

export function readPairCode(text: string): PairCode | undefined {
  const m = text.trim().match(/^hoard:([A-Za-z0-9+/=]+)$/);
  if (!m) return undefined;
  try {
    const c = JSON.parse(decodeURIComponent(escape(atob(m[1]!)))) as PairCode;
    return typeof c.token === "string" && typeof c.gistId === "string" ? c : undefined;
  } catch {
    return undefined;
  }
}
