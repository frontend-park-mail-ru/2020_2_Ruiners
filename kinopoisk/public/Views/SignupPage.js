import NavLink from '../Services/navLink.js';
import Base from './Base.js';
import { signupPage } from '../main.js';
import sessionService from '../Services/sessionService.js';
import Link from '../components/Link/Link.js';
import Form from '../components/Form/Form.js';

export default class SignupPage extends Base {
    #parent

    constructor(parent) {
      super(nav);
      this.#parent = parent;
    }

    render(loginPage, menuPage) {
      this.#parent.innerHTML = '';
      const body = document.getElementById('body');
      body.className = 'page';

      this.#parent.className = 'wrapper__form register';

      const headLogin = {
        head: true,
        textContent: 'Регистрация',
        style: 'color:#FFFFFF; margin-left: 10px',
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
      this.#parent.appendChild(form);

      const linkLogin = new Link({
        parent: form,
        classname: 'linkSignupLogin',
      });
      linkLogin.render();
      linkLogin.placeContent('Войти в имеющийся аккаунт');
      const loginLink = new NavLink(linkLogin.a);
      loginLink.render('click', loginPage);
      const formLink = new NavLink(form);
      const err = document.createElement('div');
      err.className = 'error';
      formLink.render('submit', () => {
        if (!formrLogin[1].classList.contains('invalid')
                && !formrLogin[3].classList.contains('invalid')) {
          const login = formrLogin[1].value.trim();
          const password = formrLogin[3].value.trim();
          const email = formrLogin[2].value.trim();
          sessionService.signup(login, email, password).then((signupres) => {
            console.log(signupres.ok);
            if (signupres.ok) {
              nav.innerHTML = '';
              super.render();
              menuPage();
            } else {
              err.innerHTML = signupres.errmsg;
              form.appendChild(err);
            }
          });
        }
      });
    }
}
