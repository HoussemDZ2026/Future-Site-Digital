self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');
});

self.addEventListener('fetch', (e) => {
  // هذا الجزء ضروري لجعل التطبيق يعمل بدون إنترنت وللسماح بالتثبيت
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
