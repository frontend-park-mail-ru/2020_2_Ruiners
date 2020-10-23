import FilmPage from './Views/FilmPage.js';
import SignupPage from './Views/SignupPage.js';
import LoginPage from './Views/LoginPage.js';
import ProfilePage from './Views/ProfilePage.js';
import ProfileChangePage from './Views/ProfileChangePage.js';
import MenuPage from './Views/MenuPage.js';
import sessionService from '../Services/sessionService.js';

const pages = {
  signup: signupPage,
  login: loginPage,
  profile: profilePage,
  profileChange: profileChengePage,
  film: filmPage,
  menu: menuPage,
};

function menuPage() {
  let isAuth = false;
  sessionService.me()
    .then((res) => {
      if (res.ok) {
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
  signup.render(loginPage, menuPage);
}

function filmPage() {
  const film = new FilmPage(application);
  film.render();
}

function loginPage() {
  const login = new LoginPage(application);
  login.render(loginPage, menuPage, signupPage);
}

function profileChengePage() {
  let responseBody;
  application.innerHTML = '';
  sessionService.me()
    .then((res) => {
      try {
        responseBody = JSON.stringify(res.get);
      } catch (e) {
        menuPage();
        return;
      }
      if (res.ok) {
        const profileChange = new ProfileChangePage(application, responseBody);
        profileChange.render(menuPage, profilePage);
      } else {
        loginPage();
      }
    });
}

function profilePage() {
  let responseBody;
  application.innerHTML = '';
  sessionService.me()
    .then((res) => {
      try {
        responseBody = JSON.stringify(res.get);
      } catch (e) {
        menuPage();
        return;
      }
      if (res.ok) {
        const profile = new ProfilePage(application, responseBody);
        profile.render(profileChengePage);
      } else {
        loginPage();
      }
    });
}

menuPage();

export {
  menuPage, loginPage, signupPage, profilePage, profileChengePage, filmPage,
};
