import navLink from './navLink.js';

export default class SignupPage {
    #parent

    constructor(parent) {
      this.#parent = parent;
    }

    render(loginPage, createNavbar, menuPage, signupPage) {
      this.#parent.innerHTML = '';
      const body = document.getElementById('body');
      body.className = 'page';
      const form = document.createElement('form');
      this.#parent.className = 'wrapper__form login';
      this.#parent.appendChild(form);
      const header = document.createElement('h2');
      header.textContent = 'Войти';
      header.style = 'color:#FFFFFF; margin-left: 10px';
      form.appendChild(header);
      const loginInput = createInput('login', 'login', 'Логин или почта');
      const passwordInput = createInput('password', 'password', 'Пароль');
      form.appendChild(loginInput);
      form.appendChild(passwordInput);
      const button = document.createElement('button');
      button.type = 'submit';
      button.textContent = 'Войти';
      button.className = 'secondary';
      form.appendChild(button);
      const formLink = new navLink(form);
      formLink.render('submit', () => {
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();
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
              createNavbar();
              menuPage();
            } else if (res === 301) {
              loginPage();
            } else {
              alert('error');
            }
          });
      });
      const linkSignup = createA('/signup', 'Создать новый');
      linkSignup.style = 'color: #FFFFFF; margin-left: 10px';
      form.appendChild(linkSignup);
      const loginLink = new navLink(linkSignup);
      loginLink.render('click', signupPage);
    }
}
