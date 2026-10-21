// Service worker PWA: офлайн-работа после первого открытия.
// Страница — сначала из сети (перепроверка у сервера, мимо 10-минутного HTTP-кэша
// GitHub Pages), без сети — из кэша. Файлы сборки с хэшем в имени не меняются —
// берутся из кэша; после загрузки новой версии файлы старых сборок удаляются.
// version.json и запросы к GitHub (синхронизация) не трогаем.
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

// Удаляет из кэша файлы сборок, которых нет в текущей версии сайта.
async function prune() {
  const r = await fetch("version.json", { cache: "no-store" });
  if (!r.ok) return;
  const { assets } = await r.json();
  if (!Array.isArray(assets) || !assets.length) return;
  const keep = new Set(assets.map((a) => new URL(a, self.registration.scope).href));
  const cache = await caches.open(CACHE);
  for (const req of await cache.keys())
    if (new URL(req.url).pathname.includes("/assets/") && !keep.has(req.url)) await cache.delete(req);
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin || url.pathname.endsWith("/version.json")) return;

  if (req.mode === "navigate") {
    // навигационный запрос нельзя пересоздать с параметрами — запрашиваем по адресу
    e.respondWith(
      fetch(req.url, { cache: "no-cache", credentials: "same-origin" })
        .then((res) => {
          // запасная копия — только для самого приложения, не для других адресов сайта
          if (url.href.split(/[?#]/)[0] !== self.registration.scope && !url.pathname.endsWith("/index.html")) return res;
          e.waitUntil(prune().catch(() => {}));
          return put(new Request("./"), res);
        })
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
