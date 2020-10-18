import NavLink from '../Services/navLink.js';
import { createA, renderForm } from './Components.js';
import Base from "./Base.js";

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
      // const form = document.createElement('form');
      this.#parent.className = 'wrapper__form login';
      // const header = document.createElement('h2');
      // header.textContent = 'Войти';
      // header.style = 'color:#FFFFFF; margin-left: 10px';
      // form.appendChild(header);
      // const loginInput = createInput('login', 'login', 'Логин или почта');
      // const passwordInput = createInput('password', 'password', 'Пароль');
      // form.appendChild(loginInput);
      // form.appendChild(passwordInput);
      // const button = document.createElement('button');
      // button.type = 'submit';
      // button.textContent = 'Войти';
      // button.className = 'secondary';
      // form.appendChild(button);
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

        ajaxPostUsingFetch({
          url: '/login',
          body: {
            login,
            password,
          },
        })
          .then((res) => {
            if (res === 200) {
              nav.innerHTML = '';
              super.render();
              menuPage();
            } else if (res === 301) {
              loginPage();
            } else {
              err.innerHTML = 'Неправильный пароль или логин';
              form.appendChild(err);
            }
          });
      });
      const linkSignup = createA('/signup', 'Создать новый аккаунт');
      linkSignup.style = 'color: #FFFFFF; margin-left: 10px';
      form.appendChild(linkSignup);
      const loginLink = new NavLink(linkSignup);
      loginLink.render('click', signupPage);
    }
}
