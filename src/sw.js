const CACHE_NAME = 'krecipes-cache-' + __BUILD_HASH__;
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

// Activate new SW immediately, don't wait for tabs to close
self.addEventListener('install', function(event) {
    if(typeof caches === 'undefined') return;
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
            .then(function() {
                return self.skipWaiting();
            })
    );
});

// Delete old caches when new SW activates
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames
                    .filter(function(name) { return name !== CACHE_NAME; })
                    .map(function(name) { return caches.delete(name); })
            );
        }).then(function() {
            return self.clients.claim();
        })
    );
});

// Network-first strategy: try server, fall back to cache
self.addEventListener('fetch', function(event) {
    if(typeof caches === 'undefined') {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(function(response) {
                // Only cache GET requests (cache.put() throws for other methods)
                if(response.ok && event.request.method === 'GET') {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, responseClone);
                    }).catch(function(err) {
                        console.warn('Failed to update cache:', err);
                    });
                }
                return response;
            })
            .catch(function() {
                // Network failed, fall back to cache (offline support)
                return caches.match(event.request);
            })
    );
});