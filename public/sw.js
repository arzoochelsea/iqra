const CACHE_VERSION = "iqra-v2";
const PAGE_CACHE = `${CACHE_VERSION}-pages`;
const ASSET_CACHE = `${CACHE_VERSION}-assets`;
const DATA_CACHE = `${CACHE_VERSION}-data`;
const PRECACHE_URLS = ["/", "/offline", "/why-iqra", "/surahs", "/search", "/saved", "/about", "/icons/icon-192.png", "/icons/icon-512.png", "/icons/icon-maskable-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(PAGE_CACHE).then((cache) => cache.addAll(PRECACHE_URLS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  const currentCaches = new Set([PAGE_CACHE, ASSET_CACHE, DATA_CACHE]);
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => !currentCaches.has(key)).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

async function networkFirst(request, cacheName, fallbackUrl) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request)) || (fallbackUrl && await caches.match(fallbackUrl)) || Response.error();
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const update = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => cached);
  return cached || update;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, PAGE_CACHE, "/offline"));
    return;
  }
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request, DATA_CACHE));
    return;
  }
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/") || ["style", "script", "font", "image"].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request, ASSET_CACHE));
  }
});
