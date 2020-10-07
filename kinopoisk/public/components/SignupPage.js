import navLink from './navLink.js';

export default class SignupPage {
    #parent

    constructor(parent) {
      this.#parent = parent;
    }

    render(loginPage) {
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
          errorVal: 'Недопустимый логин',
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
          errorVal: 'Недопустимый пароль',
        },
      ];

      const subLogin = {
        text: 'Регистрация',
        className: 'secondary',
      };

      const formrLogin = renderForm(headLogin, configInputLogin, subLogin);
      const form = formrLogin[0];
      this.#parent.appendChild(form);

      // const button = document.createElement('button');
      // button.href = '/';
      // button.textContent = 'Регистрация';
      // button.className = 'secondary';
      // form.appendChild(button);

      const linkLogin = createA('/login', 'Войти в имеющийся');
      linkLogin.style = 'color: #FFFFFF; margin-left: 10px';
      const loginLink = new navLink(linkLogin);
      loginLink.render('click', loginPage);
      form.appendChild(linkLogin);
      const formLink = new navLink(form);

      formLink.render('submit', () => {
        if (!formrLogin[1].classList.contains('invalid')
                || !formrLogin[3].classList.contains('invalid')) {
          const login = formrLogin[1].value.trim();
          const password = formrLogin[3].value.trim();
          const email = formrLogin[2].value.trim();
          ajaxPostUsingFetch({
            url: '/signup',
            body: {
              email,
              login,
              password,
            },
          })
            .then((res) => {
              if (res === 200) {
                loginPage();
              } else {
                alert('error');
              }
            });
        }
      });
    }
}
