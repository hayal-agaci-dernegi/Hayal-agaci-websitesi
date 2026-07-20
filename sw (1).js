const CACHE_NAME = 'hayal-agaci-offline-v1';
const OFFLINE_URL = '/internetyok.html';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // Sadece çevrimdışı sayfasını önbelleğe alıyoruz.
            return cache.addAll([
                OFFLINE_URL,
                '/style.css',
                '/source/ha/ha_logo_lr.png'
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    // Sadece HTML isteklerinde (sayfa geçişlerinde) çalışsın
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                // İnternet yoksa özel çevrimdışı sayfamızı göster
                return caches.match(OFFLINE_URL);
            })
        );
    }
});