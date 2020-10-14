import FilmPage from './Views/FilmPage.js';
import Navbar from "./Views/Navbar.js";
import SignupPage from './Views/SignupPage.js';
import LoginPage from './Views/LoginPage.js';
import ProfilePage from './Views/ProfilePage.js';
import ProfileChangePage from './Views/ProfileChangePage.js';
import MenuPage from './Views/MenuPage.js';
import Whois from "./Services/Whois.js";

const pages = {
  signup: signupPage,
  login: loginPage,
  navbar: createNavbar,
  profile: profilePage,
  profileChange: profileChengePage,
  film: filmPage,
  menu: menuPage,
};

function createNavbar() {
  let isAuthorized = false;
  Whois.getLogin(menuPage, res => {
      if (res.status === 202) {
          isAuthorized = false;
      } else {
          isAuthorized = true;
      }
      const navbar = new Navbar(res.json.Login, isAuthorized, nav);
      navbar.render(createNavbar, loginPage, signupPage, menuPage);
  });
}

function menuPage() {
  let isAuth = false;
  ajaxGetUsingFetch({ url: '/me', body: null })
    .then((res) => {
      if (res.status === 200) {
        isAuth = true;
      } else {
        isAuth = false;
      }
      const menu = new MenuPage(application);
      menu.render(pages, isAuth);
    });
}

function signupPage() {
  const signup = new SignupPage(application);
  signup.render(loginPage, menuPage, createNavbar);
}

function filmPage() {
  const film = new FilmPage(application);
  film.render();
}

function loginPage() {
  const login = new LoginPage(application);
  login.render(loginPage, createNavbar, menuPage, signupPage);
}

function profileChengePage() {
    let responseBody;
  application.innerHTML = '';
  ajaxGetUsingFetch({ url: '/me', body: null })
    .then((res) => {
        try {
            responseBody = JSON.stringify(res.json);
        } catch (e) {
            menuPage();
            return;
        }
      if (res.status === 200) {
        const profileChange = new ProfileChangePage(application, responseBody);
        profileChange.render(menuPage, profilePage, createNavbar);
      } else {
        loginPage();
      }
    });
}

function profilePage() {
    let responseBody
  application.innerHTML = '';
  ajaxGetUsingFetch({ url: '/me', body: null })
    .then((res) => {
        try {
            responseBody = JSON.stringify(res.json);
        } catch (e) {
            menuPage();
            return;
        }
      if (res.status === 200) {
        const profile = new ProfilePage(application, responseBody);
        profile.render(profileChengePage);
      } else {
        loginPage();
      }
    });
}

createNavbar();
menuPage();
