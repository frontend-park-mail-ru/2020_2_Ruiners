import NavLink from '../modules/navLink.js';
import Form from '../Components/Form/Form.js';
import Base from './Base.js';
import sessionService from '../Services/sessionService.js';
import Link from '../Components/Link/Link.js';
import Bus from '../modules/EventBus.js';
import { nav } from "../config.js";
import Button from "../Components/Button/Button";

export default class LoginPage extends Base {
  constructor(parent) {
    super(nav);
    this.parent = parent;
  }

  render() {
    super.render(false);
    this.parent.innerHTML = '';
    const body = document.getElementById('body');
    body.className = 'main__background';
    body.style.backgroundImage = `linear-gradient(to top, rgba(46, 46, 46, 1) 0%, rgba(46, 46, 46, 0.8) 20%, rgba(46, 46, 46, 0.6) 40%, rgba(46, 46, 46, 0.4) 60%, rgba(46, 46, 46, 0.2) 80%, rgba(46, 46, 46, 0) 100%), url(\'images/login.jpg\')`;
    const loginBox = document.createElement('div');
    loginBox.className = 'wrapper__form__regLog login';
    this.parent.appendChild(loginBox);
    const headLogin = {
      head: true,
      textContent: 'Вход',
      style: 'color:#FFFFFF; padding: 10px 10px 0 10px',
    };

    const configInputLogin = [
      {
        type: 'login',
        name: 'login',
        text: 'Логин',
        required: true,
        valid: false,
      },
      {
        type: 'password',
        name: 'password',
        text: 'Пароль',
        required: true,
        valid: false,
      },
    ];

    const subLogin = {
      text: 'Войти',
      className: 'button buttons__forRegLog',
    };

    const formLog = new Form(headLogin, configInputLogin, subLogin);
    const formrLogin = formLog.render();

    // const formrLogin = renderForm(headLogin, configInputLogin, subLogin);
    const form = formrLogin[0];
    loginBox.appendChild(form);
    const err = document.createElement('div');
    err.className = 'error';
    const buttonLogin = new Button({
      parent: form,
      classname: 'buttons__marginForFilmCard',
      text: 'Войти',
    });
    Bus.emit('Login', {
      button: buttonLogin,
      formrLogin: formrLogin,
      err: err,
      form: form,
    });
    const linkSignup = new Link({
      parent: form,
      classname: 'linkSignupLogin',
      pathname: '/signup',
    });
    linkSignup.render();
    linkSignup.placeContent('Создать новый аккаунт');
  }
}
