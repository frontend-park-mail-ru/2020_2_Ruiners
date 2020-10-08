import navLink from './navLink.js';

export default class ProfileChangePage {
    #parent

    #data

    constructor(parent, data) {
      this.#parent = parent;
      this.#data = data;
    }

    render(menuPage, profilePage, createNavbar) {
      const body = document.getElementById('body');
      body.className = 'page';

      this.#parent.className = 'wrapper__form chenge';

      const responseBody = JSON.parse(this.#data);

      const headLogin = {
        head: true,
        textContent: 'Настройки пользователя',
        style: 'color:#FFFFFF; margin-left: 10px',
      };

      const configInputLogin = [
        {
          type: 'login',
          name: 'login',
          text: `${responseBody.Login}`,
          required: true,
          valid: true,
          reg: /[A-Za-z0-9]{5,15}/,
          errorVal: 'Недопустимый логин',
        },
      ];

      const subLogin = {
        text: 'Изменить пароль',
        className: 'secondary',
      };

      const formrLogin = renderForm(headLogin, configInputLogin, subLogin);
      const form = formrLogin[0];
      this.#parent.appendChild(form);

      const formLink = new navLink(form);
      formLink.render('submit', () => {
        if (!formrLogin[1].classList.contains('invalid')) {
          const login = formrLogin[1].value.trim();
          ajaxPostUsingFetch({
            url: '/chengelogin',
            body: {
              login,
            },
          })
            .then((res) => {
              if (res === 200) {
                nav.innerHTML = '';
                createNavbar();
                profilePage();
              } else {
                alert('error');
              }
            });
        }
      });

      const head = {
        head: false,
      };

      const configInput = [
        {
          type: 'password',
          name: 'password',
          text: 'Старый пароль',
          required: true,
          valid: false,
        },
        {
          type: 'password',
          name: 'password',
          text: 'Новый пароль',
          required: true,
          valid: true,
          reg: /.{8,16}/,
          errorVal: 'Недопустимый пароль 1',
        },
        {
          type: 'password',
          name: 'password',
          text: 'Повторите новый пароль',
          required: true,
          valid: true,
          reg: /.{8,16}/,
          errorVal: 'Недопустимый пароль 2',
        },
      ];

      const sub = {
        text: 'Изменить пароль',
        className: 'secondary',
      };

      const formr = renderForm(head, configInput, sub);
      const formPass = formr[0];
      this.#parent.appendChild(formPass);

      const formPassLink = new navLink(formPass);

      formPassLink.render('submit', () => {
        if (!formr[2].classList.contains('invalid')
                || !formr[3].classList.contains('invalid')) {
          const PasswordOld = formr[1].value.trim();
          const Password = formr[2].value.trim();
          const pass = formr[3].value.trim();
          if (Password === pass) {
            ajaxPostUsingFetch({
              url: '/chengepass',
              body: {
                PasswordOld,
                Password,
              },
            })
              .then((res) => {
                if (res === 200) {
                  profilePage();
                } else {
                  alert('error');
                }
              });
          }
        }
      });

      const formAvatar = document.createElement('form');
      this.#parent.appendChild(formAvatar);

      const imgAvatar = createInput('file', 'file', 'Фото');
      formAvatar.appendChild(imgAvatar);

      const buttonBack = document.createElement('button');
      buttonBack.href = '/';
      buttonBack.textContent = 'Назад';
      buttonBack.className = 'secondary';
      buttonBack.dataset.section = 'profile';
      const buttonBackLink = new navLink(buttonBack);
      buttonBackLink.render('click', () => {
        profilePage();
      });
      this.#parent.appendChild(buttonBack);
    }
}
