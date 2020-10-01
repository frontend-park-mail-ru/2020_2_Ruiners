
const application = document.getElementById('app');

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

application.innerHTML = '';
const navbar = document.createElement('nav');
application.appendChild(navbar);
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

Object.keys(menu).map((menuKey) => {
    const {href, text} = menu[menuKey];
    const menuItem = document.createElement('a');
    menuItem.href = href;
    menuItem.textContent = text;
    menuItem.dataset.section = menuKey;
    application.appendChild(menuItem);
});

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

const signupLink = application.querySelector('[data-section="film"]');

signupLink.addEventListener('click', (event) => {
    /*event.preventDefault();
    application.innerHTML = '';
    const navbar = document.createElement('nav');
    application.appendChild(navbar);
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
    ul.appendChild(li5);*/
});