let version='0.3';
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('airhorner').then(cache => {
      return cache.addAll([
        `/pwa-note/`,
        `/pwa-note/index.html`
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
