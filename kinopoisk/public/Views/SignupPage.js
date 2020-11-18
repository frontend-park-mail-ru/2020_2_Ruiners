import Bus from '../modules/EventBus.js';
import Base from './Base.js';
import Link from '../Components/Link/Link.js';
import Form from '../Components/Form/Form.js';
import {nav} from "../config.js";
import Button from "../Components/Button/Button";

export default class SignupPage extends Base {
  constructor(parent) {
    super(nav);
    this.parent = parent;
  }

  render() {
    super.render(false);
    this.parent.innerHTML = '';
    const body = document.getElementById('body');
    body.style.backgroundImage = 'url(\'images/login.jpg\')';
    const signupBox = document.createElement('div');
    signupBox.className = 'wrapper__form__regLog register';
    this.parent.appendChild(signupBox);
    const headLogin = {
      head: true,
      textContent: 'Регистрация',
      style: 'color:#FFFFFF; padding: 10px 10px 0 10px',
    };

    const configInputLogin = [
      {
        type: 'login',
        name: 'login',
        text: 'Логин',
        required: true,
        valid: true,
        reg: /[A-Za-z0-9]{5,15}/,
        errorVal: 'Недопустимый логин(Должен быть от 5 до 15 символов)',
      },
      {
        type: 'email',
        name: 'email',
        text: 'e-mail',
        required: true,
        valid: false,
      },
      {
        type: 'password',
        name: 'password',
        text: 'Пароль',
        required: true,
        valid: true,
        reg: /.{8,16}/,
        errorVal: 'Недопустимый пароль(Должен быть от 8 до 16 символов)',
      },
    ];

    const subLogin = {
      text: 'Регистрация',
      className: 'secondary',
    };

    const formLog = new Form(headLogin, configInputLogin, subLogin);
    const formrLogin = formLog.render();

    // const formrLogin = renderForm(headLogin, configInputLogin, subLogin);
    const form = formrLogin[0];
    signupBox.appendChild(form);
    const err = document.createElement('div');
    err.className = 'error';
    const buttonSignup = new Button({
      parent: form,
      classname: 'buttons__marginForFilmCard',
      text: 'Зарегистрироваться',
    });
    Bus.emit('Signup', {
      button: buttonSignup,
      formrLogin: formrLogin,
      err: err,
      form: form,
    });

    const linkLogin = new Link({
      parent: form,
      classname: 'linkSignupLogin',
      pathname: '/login',
    });
    linkLogin.render();
    linkLogin.placeContent('Войти в имеющийся аккаунт');
  }
}
