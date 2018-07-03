
const cacheName = 'free-currency-cachev2';
self.addEventListener('install', event => {
    console.info('Service Worker caching files');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll([
              './',    
              './index.html',            
              './app/script.js',
              './styles.css' ])
        })
    )
});

self.addEventListener('activate', event => {
    console.info('Service Worker activating');
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
