import NavLink from '../../modules/navLink.js';
import List from '../../Components/List/List.js';
import Link from '../../Components/Link/Link.js';
import Navigate from '../../Components/Nav/Nav.js';
import Button from '../../Components/Button/Button.js';
import Window from '../../Components/window/Window.js';
import SessionService from '../../Services/sessionService.js';
import Bus from '../../modules/EventBus.js';
import { domain, nav } from '../../config.js';
import stylesNavbar from './Navbar.scss';

export default class Navbar {
  constructor(parent) {
    this.parent = parent;
  }

  render(isAuthorized, res) {
    nav.innerHTML = '';
    const NavigateObj = new Navigate(this.parent);
    const Nav = NavigateObj.render();

    const ul = document.createElement('ul');
    Nav.appendChild(ul);

    const BrandObj = new List({
      parent: ul,
      classname: 'brand',
    });
    const Brand = BrandObj.render();
    const href = document.createElement('a');
    href.innerHTML = 'KINO <img width="25", height="25" src="images/icons8-кинопроектор-96.png"/> PARK';
    Brand.appendChild(href);
    href.addEventListener('click', (evt) => {
      evt.preventDefault();
      Bus.emit('navbarClick', href);
    });

    const FilmsObj = new List({
      parent: ul,
      classname: 'menu-secondary',
    });
    const Films = FilmsObj.render();

    const FilmsAObj = new Link({
      parent: Films,
      pathname: '/',
      classname: '',
    });
    const FilmsA = FilmsAObj.render();
    FilmsAObj.placeContent('Фильмы');

    const SearchObj = new List({
      parent: ul,
      classname: 'menu-secondary_search',
    });
    const Search = SearchObj.render();
    const SearchAObj = new Link({
      parent: Search,
      pathname: '/search',
      classname: '',
    });
    const SearchA = SearchAObj.render();
    SearchAObj.placeContent('Поиск');

    if (isAuthorized) {
      const profileObj = new List({
        parent: ul,
        classname: 'right_profile',
      });
      const profile = profileObj.render();

      const profileAObj = new Link({
        parent: profile,
        className: 'profileNav',
      });
      const profileA = profileAObj.render();
      const src = `${domain}/api/user/avatar/${res.get.id}?${Math.random()}`;
      profileAObj.placeContent(`<img width="50" height="50" src="${src}" alt="" class="${stylesNavbar.round}">`);
      const profileLink = new NavLink(profileA);
      const window = new Window({ parent: profileA });
      let isOpen = false;
      profileLink.render('click', () => {
        isOpen = !isOpen;
        if (isOpen) {
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
        classname: '',
        text: 'Выйти',
      });
      buttonLogoutObj.render({
        callback: (evt) => {
          SessionService.logout().then((res) => {
            this.render(false, 0);
            Bus.emit('logout', res);
          });
        },
      });
    } else {
      const loginObj = new List({
        parent: ul,
        classname: 'right',
      });
      const login = loginObj.render();

      const buttonLoginObj = new Button({
        parent: login,
        classname: '',
        text: 'Войти',
      });
      Bus.emit('navbarLogin', buttonLoginObj);

      const signupObj = new List({
        parent: login,
        classname: '',
      });
      const signup = signupObj.render();

      const buttonSignupObj = new Button({
        parent: signup,
        classname: '',
        text: 'Зарегистрироваться',
      });
      Bus.emit('navbarSignup', buttonSignupObj);
    }
  }
}
