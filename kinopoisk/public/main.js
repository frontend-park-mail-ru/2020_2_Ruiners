import FilmPage from './Views/FilmPage.js';
import SignupPage from './Views/SignupPage.js';
import LoginPage from './Views/LoginPage.js';
import ProfilePage from './Views/ProfilePage.js';
import ProfileChangePage from './Views/ProfileChangePage.js';
import MenuPage from './Views/MenuPage.js';

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
        profileChange.render(menuPage, profilePage);
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

menuPage();

export { menuPage, loginPage, signupPage, profilePage, profileChengePage }
