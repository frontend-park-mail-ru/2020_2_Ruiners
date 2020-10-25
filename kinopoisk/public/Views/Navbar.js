import NavLink from '../Services/navLink.js';
import List from '../components/List/List.js';
import Link from '../components/Link/Link.js';
import Navigate from '../components/Nav/Nav.js';
import Button from '../components/Button/Button.js';
import {
  menuPage, loginPage, signupPage, profilePage,
} from '../main.js';
import Base from './Base.js';
import Window from '../components/window/Window.js';
import navLink from '../Services/navLink.js';
import SessionService from '../Services/sessionService.js';

export default class Navbar {
  #parent;

  constructor(parent) {
    this.#parent = parent;
  }

  render(isAuthorized, res) {
    nav.innerHTML = '';
    const NavigateObj = new Navigate(this.#parent);
    const Nav = NavigateObj.render();

    const ul = document.createElement('ul');
    Nav.appendChild(ul);

    const BrandObj = new List({
      parent: ul,
      classname: 'brand',
    });
    const Brand = BrandObj.render();
    const href = document.createElement('a');
    href.innerHTML = 'KINO <img width="25", height="25" src="../static/images/icons8-кинопроектор-96.png"/> PARK';
    Brand.appendChild(href);

    const mainLink = new NavLink(href);
    mainLink.render('click', () => {
      menuPage();
    });

    const FilmsObj = new List({
      parent: ul,
      classname: 'menu-secondary',
    });
    const Films = FilmsObj.render();

    const FilmsAObj = new Link({
      parent: Films,
      classname: '',
    });
    const FilmsA = FilmsAObj.render();
    FilmsAObj.placeContent('Фильмы');

    const SerialsObj = new List({
      parent: ul,
      classname: 'menu-secondary',
    });
    const Serials = SerialsObj.render();

    const SerialsAObj = new Link({
      parent: Serials,
      classname: '',
    });
    const SerialsA = SerialsAObj.render();
    SerialsAObj.placeContent('Сериалы');

    if (isAuthorized) {
      const profileObj = new List({
        parent: ul,
        classname: 'right',
      });
      const profile = profileObj.render();

      const profileAObj = new Link({
        parent: profile,
        className: 'profileNav',
      });
      const profileA = profileAObj.render();
      profileAObj.placeContent('<img width="50" height="50" src="../static/images/user-no-big.gif" alt="" class="round">');
      const profileLink = new navLink(profileA);
      const window = new Window({ parent: profileA });
      let windowClicks = 0;
      profileLink.render('click', () => {
        windowClicks += 1;
        if (windowClicks % 2 == 1) {
          window.render(() => {
          });
        } else {
          window.close();
        }
      });
      const logoutObj = new List({
        parent: profile,
        classname: '',
      });
      const logout = logoutObj.render();

      const buttonLogoutObj = new Button({
        parent: logout,
        classname: 'buttons',
        text: 'Выйти',
      });
      buttonLogoutObj.render((evt) => {
        SessionService.logout().then((res) => {
          if (res.ok) {
            this.render(false, 0);
            loginPage();
          } else {
            console.log(res.errmsg);
          }
        });
      });
    } else {
      const loginObj = new List({
        parent: ul,
        classname: 'right',
      });
      const login = loginObj.render();

      const buttonLoginObj = new Button({
        parent: login,
        classname: 'buttons',
        text: 'Войти',
      });
      buttonLoginObj.render((evt) => {
        loginPage();
      });

      const signupObj = new List({
        parent: login,
        classname: '',
      });
      const signup = signupObj.render();

      const buttonSignupObj = new Button({
        parent: signup,
        classname: 'buttons',
        text: 'Зарегистрироваться',
      });
      buttonSignupObj.render((evt) => {
        signupPage();
      });
    }
  }
}