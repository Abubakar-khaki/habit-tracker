const CACHE = 'nexo-v3';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => e.respondWith(
  caches.open(CACHE).then(c =>
    c.match(e.request).then(r => r || fetch(e.request).then(res => {
      if (e.request.method === 'GET') c.put(e.request, res.clone());
      return res;
    }))
  )
));
