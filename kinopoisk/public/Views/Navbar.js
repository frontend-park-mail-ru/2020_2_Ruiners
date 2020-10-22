import NavLink from "../Services/navLink.js";
import List from "../components/List/List.js";
import Link from "../components/Link/Link.js";
import Navigate from "../components/Nav/Nav.js";
import Button from "../components/Button/Button.js";
import { menuPage, loginPage, signupPage, profilePage } from "../main.js"
import Base from "./Base.js";
import Window from "../components/window/Window.js";
import navLink from "../Services/navLink.js";
import SessionService from "../Services/sessionService.js";

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

            let BrandObj = new List({
                parent: ul,
                classname: 'brand'
            });
            let Brand = BrandObj.render();
            const href = document.createElement('a');
            href.innerHTML = `KINO <img width="25", height="25" src="../static/images/icons8-кинопроектор-96.png"/> PARK`;
            Brand.appendChild(href);

            const mainLink = new NavLink(href);
            mainLink.render('click', () => {
                menuPage();
            });

            let FilmsObj = new List({
                parent: ul,
                classname: 'menu-secondary'
            });
            let Films = FilmsObj.render();

            let FilmsAObj = new Link({
                parent: Films,
                classname: ''
            });
            let FilmsA = FilmsAObj.render();
            FilmsAObj.placeContent('Фильмы');

            let SerialsObj = new List({
                parent: ul,
                classname: 'menu-secondary'
            });
            let Serials = SerialsObj.render();

            let SerialsAObj = new Link({
                parent: Serials,
                classname: ''
            });
            let SerialsA = SerialsAObj.render();
            SerialsAObj.placeContent('Сериалы');

            if (isAuthorized) {
                let profileObj = new List({
                    parent:ul,
                    classname: 'right'
                });
                let profile = profileObj.render();

                let profileAObj = new Link({
                    parent: profile,
                    className: 'profileNav'
                });
                let profileA = profileAObj.render();
                profileAObj.placeContent(`<img width="50" height="50" src="../static/images/user-no-big.gif" alt="" class="round">`);
                const profileLink = new navLink(profileA);
                const window = new Window({parent: profileA});
                profileLink.render('click', () => {
                    windowClicks++;
                    if (windowClicks % 2 == 1) {
                        window.render(() => {
                        });
                    } else {
                        window.close();
                    }
                });
                let logoutObj = new List({
                    parent: profile,
                    classname: ''
                });
                let logout = logoutObj.render();

                let buttonLogoutObj = new Button({
                    parent: logout,
                    classname: 'buttons',
                    text: 'Выйти'
                });
                buttonLogoutObj.render( evt => {
                    SessionService.logout().then( res => {
                        if (res.ok) {
                            this.render( false, 0);
                            loginPage();
                        } else {
                            console.log(res.errmsg);
                        }
                    });
                });
            } else {
                let loginObj = new List({
                    parent: ul,
                    classname: 'right'
                });
                let login = loginObj.render();

                let buttonLoginObj = new Button({
                    parent: login,
                    classname: 'buttons',
                    text: 'Войти'});
                buttonLoginObj.render((evt) => {
                    loginPage();
                });


                let signupObj = new List({
                    parent: login,
                    classname: ''
                });
                let signup = signupObj.render();

                let buttonSignupObj = new Button({
                    parent: signup,
                    classname: 'buttons',
                    text: 'Зарегистрироваться'});
                buttonSignupObj.render((evt) => {
                    signupPage();
                });
            }
    }
}
