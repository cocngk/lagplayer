/*
 Probably one of the simplest functional service workers
 
 Version: 0.0.2
*/

const currentVersion = 'v0.0.4.0.9.2';
const assets = [
  'index.html',
  'index.css',
  'jquery.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(currentVersion).then(cache => 
      {
        return cache.addAll(assets)
      })
  );
});

// self.addEventListener('fetch', e => {
//   e.respondWith(
//     caches.match(e.request).then(response => {
//       return response || fetch(e.request);
//     })
//   );
// });

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.open(currentVersion).then(cache => {
            return cache.match(e.request).then(resp => {
                // Request found in current cache, or fetch the file
                return resp || fetch(e.request).then(response => {
                    // Cache the newly fetched file for next time
                    cache.put(e.request, response.clone());
                    return response;
                // Fetch failed, user is offline
                }).catch(() => {
                    // Look in the whole cache to load a fallback version of the file
                    return caches.match(e.request).then(fallback => {
                        return fallback;
                    });
                });
            });
        })
    );
});

// self.addEventListener('activate', e => {
//     e.waitUntil(
//         caches.keys().then(keyList => 
//             Promise.all(keyList.map(key => key != currentVersion ? caches.delete(key) : Promise.resolve()))
//         )
//     );
// });
