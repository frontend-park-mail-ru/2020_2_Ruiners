
const application = document.getElementById('app');
const nav = document.getElementById('navbar');

const menu = {
    signup: {
        href: '/static/register.html',
        text: 'Зарегистрироваться',
    },
    film: {
        href: '/film',
        text: 'Страница фильма',
    },
    login: {
        href: '/static/login.html',
        text: 'Войти',
    },
    profile: {
        href: '/static/profile.html',
        text: 'Профиль',
    },
};

function menuPage() {
    Object.keys(menu).map((menuKey) => {
        const {href, text} = menu[menuKey];
        const menuItem = document.createElement('a');
        menuItem.href = href;
        menuItem.textContent = text;
        menuItem.dataset.section = menuKey;
        application.appendChild(menuItem);
    });
    const body = document.getElementById("body");
    body.className = "";
    const filmLink = application.querySelector('[data-section="film"]');

    filmLink.addEventListener('click', (event) => {
        event.preventDefault();
        application.innerHTML = '';
        filmPage();
    });
}

function filmPage() {
    const body = document.getElementById("body");
    body.className = "film1";
    application.innerHTML = '';
    const main = document.createElement('div');
    main.className = "main";
    application.appendChild(main);
    const ul1 = document.createElement('ul');
    main.appendChild(ul1);
    const li1 = document.createElement('li');
    ul1.appendChild(li1);
    const h1 = document.createElement('h1');
    h1.textContent = "Начало";
    li1.appendChild(h1);
    const li2 = document.createElement('li');
    ul1.appendChild(li2);
    const rating = document.createElement('div');
    rating.className = "rating";
    li2.appendChild(rating);
    const h11 = document.createElement('h1');
    rating.appendChild(h11);
    const span = createSpan("colour-text1", "8,7");
    const span1 = createSpan("colour-text2", "110k");
    h11.appendChild(span);
    h11.appendChild(span1);
    const rate = document.createElement('button');
    rate.textContent = "Оценить";
    rating.appendChild(rate);
    const ul2 = document.createElement("ul");
    main.appendChild(ul2);
    const li3 = document.createElement("li");
    ul2.appendChild(li3);
    const frame = document.createElement("iframe");
    frame.width="560";
    frame.height="315";
    frame.src="https://www.youtube.com/embed/85Zz1CCXyDI";
    frame.frameborder="1";
    frame.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    frame.allowFullscreen = true;
    li3.appendChild(frame);
    const film = document.createElement('div');
    film.className = 'film';
    ul2.appendChild(film);
    const p = document.createElement('p');
    p.textContent = "О фильме";
    film.appendChild(p);
    const span2 = createSpan("colour-text3", "Год: 2010");
    const span3 = createSpan("colour-text3", "Страна: США, Великобритания");
    const span4 = createSpan("colour-text3", "Режиссер: Кристофер Ноллан");
    p.appendChild(span2);
    p.appendChild(span3);
    p.appendChild(span4);
}

function createSpan(classname, text) {
    const span = document.createElement('span');
    span.className = classname;
    span.textContent = text;
    return span;
}

function createNavbar() {
    const navbar = document.createElement('nav');
    nav.appendChild(navbar);
    const ul = document.createElement('ul');
    ul.className = 'menu-main';
    navbar.appendChild(ul);
    const kinopoisk = createA("/", "Kinopoisk.ru");
    const films = createA("/", "Фильмы");
    const search = createA("/", "Поиск");
    const login = document.createElement('button');
    const signup = document.createElement('button');
    login.textContent = "Войти";
    signup.textContent = "Зарегистрироваться";
    const li1 = createLi("brand", kinopoisk);
    const li2 = createLi("menu-secondary", films);
    const li3 = createLi("menu-secondary", search);
    const li4 = createLi("menu-buttons", login);
    const li5 = createLi("menu-buttons", signup);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    kinopoisk.addEventListener('click', (event) => {
        event.preventDefault();
        application.innerHTML = '';
        menuPage();
    });
}

function createLi(className, child) {
    const li = document.createElement('li');
    li.className = className;
    li.appendChild(child);
    return li;
}

function createA(href, text) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = text;
    return a;
}

createNavbar();
menuPage();