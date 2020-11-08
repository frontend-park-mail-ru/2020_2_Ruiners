const CACHE_NAME = 'kinopark_sw-v1';
const {assets} = global.serviceWorkerOption;
for(let i = 0; i < assets.length; i++) {
    assets[i] = '.' + assets[i];
}
assets.push('/');

self.addEventListener('install', (event) => {
    console.log(assets);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(assets);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.open: ', err);
            })
    );
});

self.addEventListener('fetch', (event) => {
    console.log("aa11123132a")
    if( navigator.onLine) {
        console.log("111")
//return fetch(event.request);
    } else {
        console.log("222")
        event.respondWith(
            caches
                .match(event.request)
                .then((cachedResponse) => {
                    console.log("333")
                    if (cachedResponse) {
                        console.log("444")
                        return cachedResponse;
                    }
                    return fetch(event.request);
                })
                .catch((err) => {
                    console.log("555")
                    console.error('smth went wrong with caches.match: ', err);
                })
        );
    }
});