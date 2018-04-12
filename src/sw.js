const CACHE_NAME = 'krecipes-cache-v3';
const urlsToCache = [
    '/#/',
    '/polyfill.bundle.js',
    '/app.bundle.js',
    '/style.bundle.js',
    '/bundle.css',
    '/fonts/Roboto-Bold.woff',
    '/fonts/Roboto-Bold.woff2',
    '/fonts/Roboto-Light.woff',
    '/fonts/Roboto-Light.woff2',
    '/fonts/Roboto-Medium.woff',
    '/fonts/Roboto-Medium.woff2',
    '/fonts/Roboto-Regular.woff',
    '/fonts/Roboto-Regular.woff2',
    '/fonts/Roboto-Thin.woff',
    '/fonts/Roboto-Thin.woff2',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/locales/en/translations.json',
    '/locales/ru/translations.json',
];

self.addEventListener('install', function(event) {
    console.log('install attempt');
  // Perform install steps
    if(typeof caches === 'undefined') return;
    console.log('install success');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
        );
});

self.addEventListener('fetch', function(event) {

    if(typeof caches === 'undefined')
    {
        event.respondWith(
            fetch(event.request)
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response

                if (response) {
                    console.log('return cached response');
                    return response;
                }
                return fetch(event.request);
            })
    );
});