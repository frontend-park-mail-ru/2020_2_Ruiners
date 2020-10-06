import evtListener from "./EvtListeners.js";
const {ajaxGet, ajaxPost} = globalThis.AjaxModule;

export default class Navbar {
    #login;
    #isAuth;
    #parent;
    constructor(login, isAuth, parent) {
        this.#login = login;
        this.#isAuth = isAuth;
        this.#parent = parent;
    }
    render(nav, loginf, signupf, menu) {
        console.log(this.#isAuth);
        const navbar = document.createElement('nav');
        this.#parent.appendChild(navbar);
        const ul = document.createElement('ul');
        ul.className = 'menu-main';
        navbar.appendChild(ul);
        const kinopoisk = createA('/menu', 'Kinopoisk.ru');
        const kino = new evtListener(kinopoisk);
        kino.render(menu);
        const films = createA('/', 'Фильмы');
        const search = createA('/', 'Поиск');
        const login = document.createElement('button');
        const signup = document.createElement('button');
        login.textContent = 'Войти';
        signup.textContent = 'Зарегистрироваться';
        const li1 = createLi('brand', kinopoisk);
        const li2 = createLi('menu-secondary', films);
        const li3 = createLi('menu-secondary', search);
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        if (!this.#isAuth) {
            const li4 = createLi('menu-buttons', login);
            const li5 = createLi('menu-buttons', signup);
            ul.appendChild(li4);
            ul.appendChild(li5);
        } else {
            const logout = document.createElement('button');
            logout.textContent = 'Выйти';
            const li34 = createLi('menu-buttons', logout);
            const profile = document.createElement('button');
            profile.textContent = `${this.#login}`;
            const li33 = createLi('menu-buttons', profile);
            ul.appendChild(li33);
            ul.appendChild(li34);
            const logoutEvnt = new evtListener(logout);
            logoutEvnt.render(() => {
                ajaxGet({
                    url: '/logout',
                    body: null,
                    callback: (status, response) => {
                        if (status === 200) {
                            this.#parent.innerHTML = '';
                            nav();
                            loginf();
                        } else {
                            alert('error');
                        }
                    },
                });
            });
        }
        const loginEvnt = new evtListener(login);
        loginEvnt.render(loginf);
        const signupEvnt = new evtListener(signup);
        signupEvnt.render(signupf);
    }
}