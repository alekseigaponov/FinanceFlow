const CACHE_NAME = 'finance-x-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// Установка воркера и кэширование файлов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Перехват запросов (работа без интернета)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем из кэша, если есть, иначе скачиваем из сети
        return response || fetch(event.request);
      })
  );
});
