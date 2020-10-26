import FilmPage from "../Views/FilmPage.js";
import SignupPage from '../Views/SignupPage.js';
import LoginPage from '../Views/LoginPage.js';
import ProfilePage from '../Views/ProfilePage.js';
import ProfileChangePage from '../Views/ProfileChangePage.js';
import MenuPage from '../Views/MenuPage.js';
import sessionService from '../Services/sessionService.js';

export default class Controller {
    static menuPage() {
        let isAuth = false;
        sessionService.me()
            .then((res) => {
                if (res.ok) {
                    isAuth = true;
                } else {
                    isAuth = false;
                }
                const menu = new MenuPage(application);
                menu.render();
            });
    }

    static signupPage() {
        const signup = new SignupPage(application);
        signup.render();
    }

    static filmPage() {
        const film = new FilmPage(application);
        film.render();
    }

    static loginPage() {
        const login = new LoginPage(application);
        login.render();
    }

    static profileChengePage() {
        let responseBody;
        application.innerHTML = '';
        sessionService.me()
            .then((res) => {
                try {
                    responseBody = JSON.stringify(res.get);
                } catch (e) {
                    this.menuPage();
                    return;
                }
                if (res.ok) {
                    const profileChange = new ProfileChangePage(application, responseBody);
                    profileChange.render();
                } else {
                    this.loginPage();
                }
            });
    }

    static profilePage() {
        let responseBody;
        application.innerHTML = '';
        sessionService.me()
            .then((res) => {
                try {
                    responseBody = JSON.stringify(res.get);
                } catch (e) {
                    this.menuPage();
                    return;
                }
                if (res.ok) {
                    const profile = new ProfilePage(application, responseBody);
                    profile.render();
                } else {
                    this.loginPage();
                }
            });
    }
}
