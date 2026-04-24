const CACHE_NAME = "chord-game-708otani";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchRes => {
          cache.put(event.request, fetchRes.clone());
          return fetchRes;
        });
      });
    })
  );
});