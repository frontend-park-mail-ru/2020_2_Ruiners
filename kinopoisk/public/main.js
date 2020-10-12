import FilmPage from './components/FilmPage/FilmPage.js';
import navLink from './components/navLink.js';
import Navbar from './components/Navbar.js';
import SignupPage from './components/SignupPage.js';
import LoginPage from './components/LoginPage.js';
import ProfilePage from './components/ProfilePage.js';
import ProfileChangePage from './components/ProfileChangePage.js';
import MenuPage from "./components/MenuPage.js";

const pages = {
  'signup': signupPage,
  'login': loginPage,
  'navbar': createNavbar,
  'profile': profilePage,
  'profileChange': profileChengePage,
  'film': filmPage,
  'menu': menuPage,
}

function createNavbar() {
  let responseBody;
  let isAuthorized = false;
  ajaxGetUsingFetch({ url: '/whois', body: null })
    .then((res) => {
      responseBody = JSON.parse(JSON.stringify(res.json));
      console.log(responseBody);
      if (res.status === 202) {
        isAuthorized = false;
      } else {
        isAuthorized = true;
      }
      const navbar = new Navbar(responseBody.Login, isAuthorized, nav);
      navbar.render(createNavbar, loginPage, signupPage, menuPage);
    });
}

function menuPage() {
  const menu = new MenuPage(application);
  menu.render(pages)
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
  application.innerHTML = '';
  ajaxGetUsingFetch({ url: '/me', body: null })
    .then((res) => {
      if (res.status === 200) {
        const profileChange = new ProfileChangePage(application, JSON.stringify(res.json));
        profileChange.render(menuPage, profilePage, createNavbar);
      } else {
        loginPage();
      }
    });
}

function profilePage() {
  application.innerHTML = '';
  ajaxGetUsingFetch({ url: '/me', body: null })
    .then((res) => {
      if (res.status === 200) {
        const profile = new ProfilePage(application, JSON.stringify(res.json));
        profile.render(profileChengePage);
      } else {
        loginPage();
      }
    });
}

createNavbar();
menuPage();
