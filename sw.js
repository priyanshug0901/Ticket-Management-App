// Preaching resources
const cacheName='cache-v1';
const resourcesToPreache=[
    '/',
    'index.html',
    'style.css',
    'script.js',
    'task-list.png',
    'maskable_icon_x192.png',
    'maskable_icon_x512 .png',
    'maskable_icon_x384.png',
    'icons8-multiply-46.png',
    'icons8-plus-96.png',
];



// service worker will recieve an install event during registration 

// self => in a worker(file) self is worker ,everywhere else self is the window,
//         in other words self is the current global object .

self.addEventListener('install',event => {
    console.log('Install event');
    event.waitUntil(
      caches.open(cacheName)
      .then(cache=>{
         return  cache.addAll(resourcesToPreache);
      })
    );
});

self.addEventListener('activate',event=> {
    console.log('Activate event !');
});

// find the cached file earlier  and return it
// caches.match takes the fetch req and return the matching result from the cache
self.addEventListener('fetch',event=>{
    console.log('fetch intercepted for :', event.request.url);
    event.respondWith(caches.match(event.request)
    .then(cachedResponse =>{
        return cachedResponse || fetch(event.request);
    })
  )
});


// service worker sits betweent the site and network
// s.w. can intercept the request to the network and divert them into the cache
// when this happen he service worker receives a fetch event 


