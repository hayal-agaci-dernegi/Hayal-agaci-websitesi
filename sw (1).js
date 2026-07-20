const CACHE_NAME = 'hayal-agaci-offline-v1';
const OFFLINE_URL = '/internetyok.html';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // Çevrimdışı sayfasını ve gerekli bileşenlerini önbelleğe alıyoruz.
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
    // Sadece HTML isteklerinde (sayfa geçişlerinde) çalışır
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => {
                // İnternet kesildiğinde önbellekteki çevrimdışı sayfamızı gösterir
                return caches.match(OFFLINE_URL);
            })
        );
    }
});