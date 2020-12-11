import Form from '../Components/Form/Form.js';
import Base from './Base.js';
import Link from '../Components/Link/Link.js';
import Bus from '../modules/EventBus.js';
import { nav } from '../config.js';
import Button from '../Components/Button/Button';
import styles from '../static/CSS/main.scss';
import stylesForm from '../Components/Form/Form.scss';
import stylesLink from '../Components/Link/Link.scss';
import stylesButton from '../Components/Button/Button.scss';

export default class LoginPage extends Base {
  constructor(parent) {
    super(nav);
    this.parent = parent;
  }

  render() {
    super.render(false);
    this.parent.innerHTML = '';
    const body = document.getElementById('body');
    body.className = styles.main__background;
    body.style.backgroundImage = 'url(\'images/login.jpg\')';
    const loginBox = document.createElement('div');
    loginBox.className = stylesForm.wrapper__form__regLog + " " + stylesForm.login;
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
      className: stylesButton.button + " " + stylesButton.buttons__forRegLog,
    };

    const formLog = new Form(headLogin, configInputLogin, subLogin);
    const formrLogin = formLog.render();

    // const formrLogin = renderForm(headLogin, configInputLogin, subLogin);
    const form = formrLogin[0];
    loginBox.appendChild(form);
    const err = document.createElement('div');
    err.className = styles.error;
    const buttonLogin = new Button({
      parent: form,
      classname: stylesButton.buttons__marginForFilmCard,
      text: 'Войти',
    });
    Bus.emit('Login', {
      button: buttonLogin,
      formrLogin,
      err,
      form,
    });
    const linkSignup = new Link({
      parent: form,
      classname: stylesLink.linkSignupLogin,
      pathname: '/signup',
    });
    linkSignup.render();
    linkSignup.placeContent('Создать новый аккаунт');
  }
}
