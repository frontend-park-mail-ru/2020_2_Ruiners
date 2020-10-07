import FilmPage from './components/FilmPage/FilmPage.js';
import navLink from './components/navLink.js';
import Navbar from './components/Navbar.js';
import SignupPage from './components/SignupPage.js';
import LoginPage from './components/LoginPage.js';
import ProfilePage from './components/ProfilePage.js';
import ProfileChangePage from './components/ProfileChangePage.js';

function createNavbar() {
  let responseBody;
  let isAuthorized = false;
  ajaxGetUsingFetch({ url: '/whois', body: null })
    .then((res) => {
      responseBody = JSON.parse(JSON.stringify(res.json));
      if (res.status === 202) {
        isAuthorized = false;
      } else {
        isAuthorized = true;
      }
      const navbar = new Navbar(responseBody.login, isAuthorized, nav);
      navbar.render(createNavbar, loginPage, signupPage, menuPage);
    });
}

function menuPage() {
  application.innerHTML = '';
  application.className = '';
  const body = document.getElementById('body');
  body.className = '';
  Object.keys(config).forEach((menuKey) => {
    const { href, text } = config[menuKey];
    const menuItem = document.createElement('a');
    menuItem.href = href;
    menuItem.textContent = text;
    menuItem.dataset.section = menuKey;
    application.appendChild(menuItem);
  });
  const signupLink = application.querySelector('[data-section="signup"]');
  const signup = new navLink(signupLink);
  signup.render('click', signupPage);
  const filmLink = application.querySelector('[data-section="film"]');
  const film = new navLink(filmLink);
  film.render('click', filmPage);
  const loginLink = application.querySelector('[data-section="login"]');
  const login = new navLink(loginLink);
  login.render('click', loginPage);
  const profileLink = application.querySelector('[data-section="profile"]');
  const profile = new navLink(profileLink);
  profile.render('click', profilePage);
  const profileChengeLink = application.querySelector('[data-section="profileChenge"]');
  const profileChange = new navLink(profileChengeLink);
  profileChange.render('click', profileChengePage);
}

function signupPage() {
  const signup = new SignupPage(application);
  signup.render(loginPage);
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
  application.className = '';
  ajaxGetUsingFetch({ url: '/me', body: null })
    .then((res) => {
      if (res.status === 200) {
        const profileChange = new ProfileChangePage(application, JSON.stringify(res.json));
        profileChange.render(menuPage, profilePage, createNavbar);
      } else {
        alert('АХТУНГ, нет авторизации');
        loginPage();
      }
    });
}

function profilePage() {
  application.innerHTML = '';
  application.className = '';
  ajaxGetUsingFetch({ url: '/me', body: null })
    .then((res) => {
      if (res.status === 200) {
        const profile = new ProfilePage(application, JSON.stringify(res.json));
        profile.render(profileChengePage);
      } else {
        alert('АХТУНГ, нет авторизации');
        loginPage();
      }
    });
}

createNavbar();
menuPage();
