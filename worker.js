const cacheName = 'free-currency-cachev1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.info('Service Worker caching files');
            return cache.addAll([
              './',    
              './index.html',            
              './script.js',
              './styles.css',
          ])
        })
    );
});

self.addEventListener('activate', event => {
  event.waitUntil(
      caches.keys()
        .then(keyList => Promise.all(keyList.map(thisCacheName => {
        if (thisCacheName !== cacheName){
            console.log(`Service worker removing cached files from ${thisCacheName}`);
            return caches.delete(thisCacheName);        
        }
    })))
    );
  return self.clients.claim();
});


self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)
    .then(response => response || fetch(event.request)
      .then(response => caches.open(cacheName)
        .then(cache => {
          cache.put(event.request, response.clone());
            return response;
          }))
          .catch(err => {
          console.log(`Service Worker error caching and fetching:  ${err}`);
        }))
      );
    });