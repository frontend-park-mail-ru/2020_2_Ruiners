import EvtListener from './navLink.js';
import { createLi, createA } from './Components.js';

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
      // const kinopoisk = createA('/menu', 'KINO PARK');
      const kinopoisk = document.createElement('a');
      kinopoisk.innerHTML = '<a>KINO <img width="25", height="25" src="/static/images/icons8-кинопроектор-96.png"/> PARK</a>';
      const kino = new EvtListener(kinopoisk);
      kino.render('click', menu);
      const films = createA('/', 'Фильмы');
      const search = createA('/', 'Поиск');
      const login = this.buttonNav('Войти');
      const signup = this.buttonNav('Зарегистрироваться');
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
        const logout = this.buttonNav('Выйти');
        const li34 = createLi('menu-buttons', logout);
        const profile = this.buttonNav(`${this.#login}`);
        const li33 = createLi('menu-buttons', profile);
        ul.appendChild(li33);
        ul.appendChild(li34);
        const logoutEvnt = new EvtListener(logout);
        logoutEvnt.render('click', () => {
          ajaxGetUsingFetch({ url: '/logout', body: null })
            .then((res) => {
              if (res.status === 200) {
                this.#parent.innerHTML = '';
                nav();
                loginf();
              } else {
                alert('error');
              }
            });
        });
      }
      const loginEvnt = new EvtListener(login);
      loginEvnt.render('click', loginf);
      const signupEvnt = new EvtListener(signup);
      signupEvnt.render('click', signupf);
    }

    buttonNav(text) {
      const logout = document.createElement('button');
      logout.textContent = text;
      return logout;
    }
}
