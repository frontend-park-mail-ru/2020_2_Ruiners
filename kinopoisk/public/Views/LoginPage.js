import NavLink from '../Services/navLink.js';
import Form from "../Components/Form/Form.js";
import Base from './Base.js';
import sessionService from '../Services/sessionService.js';
import Link from "../Components/Link/Link.js";
import Bus from "../Services/EventBus.js";

export default class LoginPage extends Base{

    constructor(parent) {
      super(nav);
      this.parent = parent;
    }

    render() {
      super.render(false);
      this.parent.innerHTML = '';
      const body = document.getElementById('body');
      body.className = 'page';
      body.style.backgroundImage = `url('images/login.jpg')`;
      this.parent.className = 'wrapper__form__regLog login';
      const headLogin = {
        head: true,
        textContent: 'Вход',
        style: 'color:#FFFFFF; margin-left: 10px',
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
        className: 'secondary',
      };

      const formLog = new Form(headLogin, configInputLogin, subLogin);
      const formrLogin = formLog.render();

      // const formrLogin = renderForm(headLogin, configInputLogin, subLogin);
      const form = formrLogin[0];
      this.parent.appendChild(form);

      const formLink = new NavLink(form);
      const err = document.createElement('div');
      err.className = 'error';
      formLink.render('submit', () => {
        const login = formrLogin[1].value.trim();
        const password = formrLogin[2].value.trim();

        sessionService.login(login, password).then((loginres) => {
          Bus.emit('loginSignup', {
            loginres: loginres,
            err: err,
            form: form,
          });
        });
      });
      const linkSignup = new Link({
        parent: form,
        classname: 'linkSignupLogin',
        pathname: '/signup'
      });
      linkSignup.render();
      linkSignup.placeContent('Создать новый аккаунт');
      const loginLink = new NavLink(linkSignup.a);
    }
}
