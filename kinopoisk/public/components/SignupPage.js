import navLink from './navLink.js';

const { ajaxPostUsingFetch } = globalThis.AjaxModule;

export default class SignupPage {
    #parent

    constructor(parent) {
      this.#parent = parent;
    }

    render(loginPage) {
      this.#parent.innerHTML = '';
      const body = document.getElementById('body');
      body.className = 'page';
      const form = document.createElement('form');
      this.#parent.className = 'wrapper__form register';
      // form.className = 'wrapper__form register';
      this.#parent.appendChild(form);
      const header = document.createElement('h2');
      header.textContent = 'Регистрация';
      header.style = 'color:#FFFFFF; margin-left: 10px';
      form.appendChild(header);
      const loginInput = createInput('login', 'login', 'Логин');
      // loginInput.pattern = '[A-Za-z0-9]{5-15}';
      loginInput.required = true;
      const emailInput = createInput('email', 'email', 'e-mail');
      const passwordInput = createInput('password', 'password', 'Пароль');
      // passwordInput.pattern = '.{8-16}';
      passwordInput.required = true;
      form.appendChild(loginInput);

      valid(form, /[A-Za-z0-9]{5,15}/, loginInput, 'Недопустимый логин');

      form.appendChild(emailInput);
      form.appendChild(passwordInput);

      valid(form, /.{8,16}/, passwordInput, 'Недопустимый пароль');

      const button = document.createElement('button');
      button.href = '/';
      button.textContent = 'Регистрация';
      button.className = 'secondary';

      form.appendChild(button);
      const linkLogin = createA('/login', 'Войти в имеющийся');
      linkLogin.style = 'color: #FFFFFF; margin-left: 10px';
      const loginLink = new navLink(linkLogin);
      loginLink.render('click', loginPage);
      form.appendChild(linkLogin);
      const formLink = new navLink(form);

      formLink.render('submit', () => {
        if (!loginInput.classList.contains('invalid')
                || !passwordInput.classList.contains('invalid')) {
          const login = loginInput.value.trim();
          const password = passwordInput.value.trim();
          const email = emailInput.value.trim();
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
