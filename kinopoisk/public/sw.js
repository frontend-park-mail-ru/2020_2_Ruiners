const CACHE_NAME = 'kinopark_sw-v1';

const cacheUrls = [
    '/',
    './main.js',
    './Services/filmService.js',
    './Utils/Utils.js',
   ' ./components/Profile/Profile.css',
    './components/Nav/Nav.js',
    './components/Nav/Nav.css',
    './components/window/Window.css',
    './components/window/Window.js',
    './components/window/Window.handlebars',
    './components/Button/Button.css',
    './components/Button/Button.handlebars',
    './components/Button/Button.js',
    './components/List/List.js',
    './components/List/List.css',
    './components/Link/Link.css',
    './components/Link/Link.js',
    './components/FilmPoster/FilmPoster.js',
    './components/FilmPoster/FilmPoster.css',
    './components/FilmPoster/FilmPoster.handlebars',
    './components/FilmLenta/FilmLenta.handlebars',
    './components/FilmLenta/FilmLenta.js',
    './components/FilmLenta/FilmLenta.css',
    './components/Form/Form.js',
    './components/Form/Form.css',
    './components/FilmCard/FilmCard.handlebars',
    './components/FilmCard/FilmCard.js',
    './components/FilmCard/FilmCard.css',
    './index.html',
    './Controllers/Controllers.js',
    './Services/navLink.js',
    './Services/Router.js',
    './Services/userService.js',
    './Services/EventBus.js',
    './Services/sessionService.js',
    './example.precompiled.js',
    './Views/ProfilePage.js',
    './Views/Base.js',
    './Views/SignupPage.js',
    './Views/Navbar.js',
    './Views/MenuPage.js',
    './Views/FilmPage.js',
    './Views/ProfileChangePage.js',
    './Views/LoginPage.js',
    './Views/Components.js',
    './static/CSS/main.css',
    './static/images/Ruiners.png',
    './static/images/icons8-кинопроектор-64.png',
    './static/images/Macho.jpg',
    './static/images/DOVOD.jpg',
    './static/images/icons8-кинопроектор-96.png',
    './static/images/nevidimka.jpg',
    './static/images/user-no-big.gif',
    './static/images/login.jpg',
    './static/images/test.jpg',
    './static/images/nachalo.jpg',
    './modules/ajax1.js',
    'https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.runtime.js'
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(cacheUrls);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.open: ', err);
            })
    );
});

    this.addEventListener('fetch', (event) => {
         if( navigator.onLine) {
             return fetch(event.request);
         }
        event.respondWith(
            caches
                .match(event.request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(event.request);
                })
                .catch((err) => {
                    console.error('smth went wrong with caches.match: ', err);
                })
        );
    });