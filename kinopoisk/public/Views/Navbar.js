import NavLink from "../Services/navLink.js";
import { createLi, createA } from './Components.js';
import Logout from "../Services/Logout.js";
import Li from "../components/Li/Li.js";
import A from "../components/A/A.js"
import Navigate from "../components/Nav/Nav.js";
import Button from "../components/Button/Button.js";

export default class Navbar {
    #login;

    #isAuth;

    #parent;

    constructor(login, isAuth, parent) {
        this.#login = login;
        this.#isAuth = isAuth;
        this.#parent = parent;
    }

    render( nav, loginf, signupf, menu) {
        const NavigateObj = new Navigate(this.#parent);
        const Nav = NavigateObj.render();

        const ul = document.createElement('ul');
        Nav.appendChild(ul);

        let BrandObj = new Li(ul, 'brand');
        let Brand = BrandObj.render();
        const href = document.createElement('a');
        href.innerHTML = `KINO <img width="25", height="25" src="../static/images/icons8-кинопроектор-96.png"/> PARK`;
        Brand.appendChild(href);

        const mainLink = new NavLink(href);
        mainLink.render('click', () => {
           menu();
        });

        let FilmsObj = new Li(ul, 'menu-secondary');
        let Films = FilmsObj.render();

        let FilmsAObj = new A(Films, '');
        let FilmsA = FilmsAObj.render();
        FilmsAObj.placeContent('Фильмы');

        let SerialsObj = new Li(ul, 'menu-secondary');
        let Serials = SerialsObj.render();

        let SerialsAObj = new A(Serials, '');
        let SerialsA = SerialsAObj.render();
        SerialsAObj.placeContent('Сериалы');

        if(this.#isAuth) {
            let profileObj = new Li(ul, 'right');
            let profile = profileObj.render();

            let profileAObj = new A(profile, 'profileNav');
            let profileA = profileAObj.render();
            profileAObj.placeContent(`<img width="50" height="50" src="../static/images/user-no-big.gif" alt="" class="round"> ${this.#login}`);

            let logoutObj = new Li(ul, '');
            let logout = logoutObj.render();

            let buttonObj = new Button(logout, 'buttons');
            let button = buttonObj.render();
            buttonObj.placeContent('Выйти')
            const logoutEvnt = new NavLink(button);
            logoutEvnt.render('click', () => {
                Logout.logout( res => {
                    if (res.status === 200) {
                        this.#parent.innerHTML = '';
                        nav();
                        loginf();
                    } else {
                        alert('error');
                    }
                });
            });
        } else {
            let loginObj = new Li(ul, 'right');
            let login = loginObj.render();

            let buttonLoginObj = new Button(login, 'buttons');
            let buttonLogin = buttonLoginObj.render();
            buttonLoginObj.placeContent('Войти');

            let signupObj = new Li(ul, '');
            let signup = signupObj.render();

            let buttonSignupObj = new Button(signup, 'buttons');
            let buttonSignup = buttonSignupObj.render();
            buttonSignupObj.placeContent('Зарегистрироваться');

            const loginEvnt = new NavLink(login);
            loginEvnt.render('click', loginf);
            const signupEvnt = new NavLink(signup);
            signupEvnt.render('click', signupf);
        }
    }
}
