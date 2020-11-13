import NavLink from '../modules/navLink.js';
import List from '../Components/List/List.js';
import Link from '../Components/Link/Link.js';
import Navigate from '../Components/Nav/Nav.js';
import Button from '../Components/Button/Button.js';
import Window from '../Components/window/Window.js';
import navLink from '../modules/navLink.js';
import SessionService from '../Services/sessionService.js';
import Bus from '../modules/EventBus.js';

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

    const mainLink = new NavLink(href);
    Bus.emit('navbarClick', mainLink);

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
      const src = `${domain}/user/avatar/${res.get.id}?${Math.random()}`;
      profileAObj.placeContent(`<img width="50" height="50" src="${src}" alt="" class="round">`);
      const profileLink = new navLink(profileA);
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
