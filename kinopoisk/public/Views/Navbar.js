import NavLink from "../Services/navLink.js";
import Logout from "../Services/Logout.js";
import Li from "../components/Li/Li.js";
import A from "../components/A/A.js"
import Navigate from "../components/Nav/Nav.js";
import Button from "../components/Button/Button.js";
import Whois from "../Services/Whois.js";
import { menuPage, loginPage, signupPage } from "../main.js"

export default class Navbar {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        nav.innerHTML = '';
        let isAuthorized = false;
        Whois.getLogin(menuPage, res => {
            if (res.status === 202) {
                isAuthorized = false;
            } else {
                isAuthorized = true;
            }
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
                menuPage();
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

            if (isAuthorized) {
                let profileObj = new Li(ul, 'right');
                let profile = profileObj.render();

                let profileAObj = new A(profile, 'profileNav');
                let profileA = profileAObj.render();
                profileAObj.placeContent(`<img width="50" height="50" src="../static/images/user-no-big.gif" alt="" class="round"> ${res.json.Login}`);

                let logoutObj = new Li(profile, '');
                let logout = logoutObj.render();

                let buttonObj = new Button(logout, 'buttons');
                let button = buttonObj.render();
                buttonObj.placeContent('Выйти')
                const logoutEvnt = new NavLink(button);
                logoutEvnt.render('click', () => {
                    Logout.logout(res => {
                        if (res.status === 200) {
                            loginPage();
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

                let signupObj = new Li(login, '');
                let signup = signupObj.render();

                let buttonSignupObj = new Button(signup, 'buttons');
                let buttonSignup = buttonSignupObj.render();
                buttonSignupObj.placeContent('Зарегистрироваться');

                const loginEvnt = new NavLink(buttonLogin);
                loginEvnt.render('click', loginPage);
                const signupEvnt = new NavLink(buttonSignup);
                signupEvnt.render('click', signupPage);
            }
        });
    }
}
