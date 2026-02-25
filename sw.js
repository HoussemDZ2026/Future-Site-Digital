const CACHE_NAME = 'future-site-v1';
const assets = [
  'user-dashboard.html',
  'manifest.json'
];

// تثبيت الخدمة وتخزين الملفات الأساسية
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تفعيل الخدمة والتحكم في المتصفح فوراً
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// التعامل مع طلبات الملفات (لجعل التطبيق يعمل أوفلاين)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// استماع للإشعارات (هذا الجزء مسؤول عن ظهور التنبيهات)
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : { title: 'طلبية جديدة!', body: 'لديك طلب جديد في المتجر' };
  const options = {
    body: data.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    vibrate: [200, 100, 200]
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
