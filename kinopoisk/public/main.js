import FilmPage from './Views/FilmPage.js';
import SignupPage from './Views/SignupPage.js';
import LoginPage from './Views/LoginPage.js';
import ProfilePage from './Views/ProfilePage.js';
import ProfileChangePage from './Views/ProfileChangePage.js';
import MenuPage from './Views/MenuPage.js';
import sessionService from '../Services/sessionService.js';
import Bus from "./Services/EventBus.js";

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
      menu.render();
    });
}

function signupPage() {
  const signup = new SignupPage(application);
  signup.render();
}

function filmPage() {
  const film = new FilmPage(application);
  film.render();
}

function loginPage() {
  const login = new LoginPage(application);
  login.render();
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
        profileChange.render();
      } else {
        loginPage();
      }
    });
}

function profilePage() {
    let responseBody
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
        profile.render();
      } else {
        loginPage();
      }
    });
}

Bus.on('profile', (href) => {
    href.render('click', () => {
        profilePage();
    });
});

Bus.on('profileChange', (href) => {
    href.render('click', () => {
        profileChengePage();
    });
});

Bus.on('film', (href) => {
    href.render('click', () => {
        filmPage();
    });
});

Bus.on('navbarLogin', (button) => {
    button.render(() => {
        loginPage();
    });
});

Bus.on('navbarSignup', (button) => {
    button.render(() => {
        signupPage();
    });
});

Bus.on('logout', (res) => {
    if (res.ok) {
        menuPage();
    } else {
        console.log(res.errmsg);
    }
});

Bus.on('navbarClick', (mainLink) => {
    mainLink.render('click', () => {
        menuPage();
    });
});

Bus.on('signupClick', (loginLink) =>  {
    loginLink.render('click', signupPage);
});

Bus.on('loginClick', (loginLink) =>  {
    loginLink.render('click', loginPage);
});

Bus.on('loginSignup', (data) => {
    const { loginres, err, form } = data;
    if (loginres.ok) {
        nav.innerHTML = '';
        menuPage();
    } else {
        err.innerHTML = loginres.errmsg;
        form.appendChild(err);
    }
});

Bus.on('loginPasswordChange', (res) => {
    profilePage();
});
Bus.on('Change', (res) => {
    profileChengePage();
});

menuPage();

