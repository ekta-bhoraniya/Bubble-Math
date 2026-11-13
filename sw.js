// Bubble Math Beach service worker: makes the game load instantly and work offline.
// Strategy: the page itself is fetched from the network first (so updates show up
// immediately) and falls back to cache offline; other files are served from cache
// and refreshed in the background.
const CACHE = 'bmb-v3';
const FILES = ['./', 'index.html', 'baloo2.woff2', 'manifest.webmanifest', 'favicon.ico', 'favicon-48.png', 'apple-touch-icon.png', 'icon-192.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const key = req.mode === 'navigate' ? './' : req;
    const cached = await cache.match(key, { ignoreSearch: req.mode === 'navigate' });
    const fresh = fetch(req).then(res => {
      if (res.ok) cache.put(key, res.clone());
      return res;
    }).catch(() => cached);
    if (req.mode === 'navigate') return fresh.then(r => r || cached);
    if (cached) { e.waitUntil(fresh); return cached; }
    return fresh;
  }));
});
