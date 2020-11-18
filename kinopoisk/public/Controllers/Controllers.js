import FilmPage from '../Views/FilmPage.js';
import SignupPage from '../Views/SignupPage.js';
import LoginPage from '../Views/LoginPage.js';
import ProfilePage from '../Views/ProfilePage.js';
import ProfileChangePage from '../Views/ProfileChangePage.js';
import MenuPage from '../Views/MenuPage.js';
import sessionService from '../Services/sessionService.js';
import filmService from '../Services/filmService.js';
import PersonPage from '../Views/PersonPage.js';
import GenrePage from '../Views/GenrePage.js';
import {application, nav} from "../config.js";
import OfflinePage from "../Views/OfflinePage/OfflinePage.js";
import Bus from "../modules/EventBus.js";
import userService from "../Services/userService.js";

export default class Controller {
  static offlinePage() {
    const page = new OfflinePage(application);
    page.render();
  }

  static menuPage() {
    const menu = new MenuPage(application);
    menu.render();
  }

  static signupPage() {
      Bus.on('Signup', (context) => {
          const { button, formrLogin, err, form } = context;
          button.render({callback : () => {
                  if (!formrLogin[1].classList.contains('invalid')
                      && !formrLogin[3].classList.contains('invalid')) {
                      const login = formrLogin[1].value.trim();
                      const password = formrLogin[3].value.trim();
                      const email = formrLogin[2].value.trim();
                      sessionService.signup(login, email, password).then((signupres) => {
                          Bus.emit('loginSignup', {
                              loginres: signupres,
                              err,
                              form,
                          });
                      });
                  }
              }})

      })
    sessionService.me()
      .then((res) => {
        if (res.ok) {
          Bus.emit('main');
        } else {
          const signup = new SignupPage(application);
          signup.render();
        }
      });
  }

  static filmPage(params) {
    const { id } = params;
    let responseBody;
    let isAuthorized = false;
    sessionService.me()
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          isAuthorized = false;
        } else {
          isAuthorized = true;
        }
        filmService.getById(id)
          .then((res) => {
            try {
              responseBody = JSON.stringify(res.get);
            } catch (e) {
              this.menuPage();
              return;
            }
            if (res.ok) {
              const film = new FilmPage({ parent: application, body: responseBody, isAuthorized });
              film.render();
            } else {
              this.menuPage();
            }
          });
      });
  }

  static loginPage() {
      Bus.on('Login', (context) => {
          const {button, formrLogin, err, form} = context;
          button.render({ callback: () => {
                  const login = formrLogin[1].value.trim();
                  const password = formrLogin[2].value.trim();
                  sessionService.login(login, password).then((loginres) => {
                      Bus.emit('loginSignup', {
                          loginres,
                          err,
                          form,
                      });
                  });
          }})
      })
    sessionService.me()
      .then((res) => {
        if (res.ok) {
          Bus.emit('main');
        } else {
          const login = new LoginPage(application);
          login.render();
        }
      });
  }

  static profileChengePage() {
    let responseBody;
    application.innerHTML = '';
    Bus.on('Save', (context) => {
        const { buttonSave, form, formPass, formData, formAvatar, formrLogin, formr, formrAvatar, base } = context;
        const err = document.createElement('div');
        buttonSave.render( { callback: () => {
                let login, PasswordOld, Password, pass;
                if (!formrLogin[1].classList.contains('invalid')) {
                    login = formrLogin[1].value.trim();
                }
                    if (!formr[2].classList.contains('invalid')
                        || !formr[3].classList.contains('invalid')) {
                        PasswordOld = formr[1].value.trim();
                        Password = formr[2].value.trim();
                        pass = formr[3].value.trim();
                    }
                            if (Password === pass) {
                                formData.append('file', formrAvatar[1].files[0]);
                                userService.Change(login, PasswordOld, Password, formData).then( (res) => {
                                    if(res.ok) {
                                        Bus.emit('ProfilePage');
                                    } else {
                                        console.log(res.errmsg);
                                        err.innerHTML = res.errmsg;
                                        err.className = 'error';
                                        formAvatar.appendChild(err);
                                    }
                                })
                            } else {
                                err.innerHTML = 'Пароли не совпадают';
                                err.className = 'error';
                                formPass.appendChild(err);
                            }

        }})
    })
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

  static profilePage(params) {
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
          profile.render(params);
        } else {
          this.loginPage();
        }
      });
  }

  static personPage(params) {
    const { id } = params;
    const person = new PersonPage({ parent: application, id });
    person.render();
  }

  static genrePage(params) {
    const { id } = params;
    const page = new GenrePage({ parent: application, genre: id });
    page.render();
  }
}
