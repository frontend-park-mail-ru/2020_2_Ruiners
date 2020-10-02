const application = document.getElementById('app');
const nav = document.getElementById('navbar');

const menu = {
    signup: {
        href: '/signup',
        text: 'Зарегистрироваться',
    },
    film: {
        href: '/film',
        text: 'Страница фильма',
    },
    login: {
        href: '/login',
        text: 'Войти',
    },
    profile: {
        href: '/profile',
        text: 'Профиль',
    },
};

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
}

function menuPage() {
    application.innerHTML = '';
    application.className = '';
    Object.keys(menu).map((menuKey) => {
        const {href, text} = menu[menuKey];
        const menuItem = document.createElement('a');
        menuItem.href = href;
        menuItem.textContent = text;
        menuItem.dataset.section = menuKey;
        application.appendChild(menuItem);
    });
}

createNavbar();
menuPage();


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

function createDiv(cla, child) {
    const div = document.createElement('div');
    div.className = cla;

    child.appendChild(div);
    return div;
}

function createInput(type, text) {
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = text;
    return input;
}

const signupLink = application.querySelector('[data-section="signup"]');
const loginLink = application.querySelector('[data-section="login"]');
const profileLink = application.querySelector('[data-section="profile"]');

signupLink.addEventListener('click', (event) => {
    event.preventDefault();
    application.innerHTML = '';
    const body = document.getElementById('body');
    body.className = 'page';
    const form = document.createElement('form');
    form.className = 'wrapper__form register';
    body.appendChild(form);
    const header = document.createElement('h2');
    header.textContent = 'Регистрация';
    header.style = 'color:#FFFFFF; margin-left: 10px';
    form.appendChild(header);
    const loginInput = createInput('login', 'Логин');
    const emailInput = createInput('email', 'e-mail');
    const passwordInput = createInput('password', 'Пароль');
    form.appendChild(loginInput);
    form.appendChild(emailInput);
    form.appendChild(passwordInput);
    const button = document.createElement('button');
    button.href = '/';
    button.textContent = 'Регистрация';
    button.className = 'secondary';
    form.appendChild(button);
    const linkLogin = createA('/login', 'Войти в имеющийся');
    linkLogin.style = 'color: #FFFFFF; margin-left: 10px';
    form.appendChild(linkLogin);
});

loginLink.addEventListener('click', (event) => {
    event.preventDefault();
    application.innerHTML = '';
    //const body = document.getElementById('body');
    application.className = 'page';
    const form = document.createElement('form');
    form.className = 'wrapper__form login';
    application.appendChild(form);
    const header = document.createElement('h2');
    header.textContent = 'Войти';
    header.style = 'color:#FFFFFF; margin-left: 10px';
    form.appendChild(header);
    const loginInput = createInput('login', 'Логин');
    const passwordInput = createInput('password', 'Пароль');
    form.appendChild(loginInput);
    form.appendChild(passwordInput);
    const button = document.createElement('button');
    button.href = '/';
    button.textContent = 'Войти';
    button.className = 'secondary';
    form.appendChild(button);
    const linkSignup = createA('/', 'Создать новый');
    linkSignup.style = 'color: #FFFFFF; margin-left: 10px';
    form.appendChild(linkSignup);
    linkSignup.addEventListener('click', (event) => {
        event.preventDefault();
        menuPage();
    });
});

profileLink.addEventListener('click', (event) => {
    event.preventDefault();
    application.innerHTML = '';

    const body = document.getElementById('body');

    const div = createDiv('page', body);
    const divshadow = createDiv('shadow', div);

    const ul = document.createElement('ul');
    ul.className = 'top-menu';
    divshadow.appendChild(ul);

    const menuItem = document.createElement('li');
    const menuItema = document.createElement('span');

    menuItema.textContent = "Профиль";

    menuItem.appendChild(menuItema);
    ul.appendChild(menuItem);

    const menu_top = {
        rech: {
            href: '/rech',
            text: 'Рецензии',
        },
        mark: {
            href: '/mark',
            text: 'Оценки',
        },
        films: {
            href: '/films',
            text: 'Фильмы',
        },
        stars: {
            href: '/stars',
            text: 'Звёзды',
        },
    };

    Object.keys(menu_top).map((menuKey) => {
        const {href, text} = menu_top[menuKey];
        const menuItem = document.createElement('li');
        const menuItema = createA(href, text);
        menuItema.dataset.section = menuKey;
        menuItem.appendChild(menuItema);
        ul.appendChild(menuItem);
    });

    const divLeft = createDiv('profileInfoWrapLeft', divshadow);
    const divAvatar = createDiv('avatarUserBoxP', divLeft);

    const img = document.createElement('img');
    img.src = 'static/images/user-no-big.gif';

    divAvatar.appendChild(img);

    const button = document.createElement('button');
    button.className = 'secondary';
    button.textContent = 'Изменить данные';
    button.href = '/hh';

    button.addEventListener('click', (event) => {
        event.preventDefault();
        application.innerHTML = '';
        menuPage();
    });

    divLeft.appendChild(button);


    const divRight = createDiv('profileInfoWrapRight', divshadow);
    const divInfo = createDiv('infoUser', divRight);

    const nick = document.createElement('a');
    nick.className = 'nick_name';
    nick.textContent = 'mgovyadkinya';

    divInfo.appendChild(nick);

    const divInfoAuth = createDiv('infoUserAuth', divRight);

    const span1 = document.createElement('span');
    span1.textContent = 'Регистрация: 11 марта 2020';
    divInfoAuth.appendChild(span1);

    const span2 = document.createElement('span');
    span2.textContent = 'Рейтинг комментариев:';
    divInfoAuth.appendChild(span2);
});
