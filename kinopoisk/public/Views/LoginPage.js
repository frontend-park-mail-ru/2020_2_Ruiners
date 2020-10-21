import NavLink from '../Services/navLink.js';
import { createA, renderForm } from './Components.js';
import Base from "./Base.js";
import sessionService from '../Services/sessionService.js';

export default class SignupPage extends Base{
    #parent

    constructor(parent) {
      super(nav);
      this.#parent = parent;
    }

    render(loginPage, menuPage, signupPage) {
      this.#parent.innerHTML = '';
      const body = document.getElementById('body');
      body.className = 'page';
      this.#parent.className = 'wrapper__form login';
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

      const formrLogin = renderForm(headLogin, configInputLogin, subLogin);
      const form = formrLogin[0];
      this.#parent.appendChild(form);

      const formLink = new NavLink(form);
      const err = document.createElement('div');
      err.className = 'error';
      formLink.render('submit', () => {
        const login = formrLogin[1].value.trim();
        const password = formrLogin[2].value.trim();
        // console.log(`login =  ${login}`);

        sessionService.login(login, password).then((loginres) => {
          console.log(loginres.ok);
          if (loginres.ok) {
            nav.innerHTML = '';
            super.render();
            menuPage();
          } else {
            err.innerHTML = loginres.errmsg;
            form.appendChild(err);
          }
        });
      });
      const linkSignup = createA('/signup', 'Создать новый аккаунт');
      linkSignup.className = 'linkSignupLogin';
      form.appendChild(linkSignup);
      const loginLink = new NavLink(linkSignup);
      loginLink.render('click', signupPage);
    }
}
