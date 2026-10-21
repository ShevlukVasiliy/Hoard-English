// Service worker PWA: офлайн-работа после первого открытия.
// Страница — сначала из сети (чтобы приходили обновления), без сети — из кэша.
// Файлы сборки с хэшем в имени не меняются — берутся из кэша.
// Запросы к GitHub (синхронизация) не трогаем.
const CACHE = "hoard-v1";
const SHELL = ["./", "manifest.webmanifest", "icon-192.png", "apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

const put = (req, res) => {
  if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
  return res;
};

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;

  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => put(new Request("./"), res))
        .catch(() => caches.match("./").then((r) => r || Response.error())),
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => {
      const fresh = fetch(req).then((res) => put(req, res));
      // файлы с хэшем не меняются, остальное обновляем в фоне
      if (hit) { if (!/\/assets\//.test(url.pathname)) fresh.catch(() => {}); return hit; }
      return fresh;
    }),
  );
});
