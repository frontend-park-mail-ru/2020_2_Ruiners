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
          errorVal: 'Недопустимый логин(Должен быть от 5 до 15 символов)',
        },
      ];

      const subLogin = {
        text: 'Изменить логин',
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
          errorVal: 'Недопустимый первый пароль(Должен быть от 8 до 16 символов)',
        },
        {
          type: 'password',
          name: 'password',
          text: 'Повторите новый пароль',
          required: true,
          valid: true,
          reg: /.{8,16}/,
          errorVal: 'Недопустимый повторенный пароль(Должен быть от 8 до 16 символов)',
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

      const configAvatar = [
        {
          type: 'file',
          name: 'file',
          text: 'фото',
          required: true,
          valid: false,
        }]
      const subAvatar = {
        text: 'Изменить аватар',
        className: 'secondary',
      };
      const formrAvatar = renderForm(head, configAvatar, subAvatar);
      const formAvatar = formrAvatar[0];
      this.#parent.appendChild(formAvatar);
      const formData = new FormData();
      const formAvatarLink = new navLink(formAvatar);
      formAvatarLink.render('submit', () => {
        console.log(formrAvatar[1].files[0]);
        formData.append('file', formrAvatar[1].files[0]);
        console.log(formData.getAll('file'))
        fetch('http://localhost:8000/changeAvatar', {
          method: 'POST',
          credentials: 'include',
          mode: 'cors',
          body: formData
        }).then(response => response.status).then(res => console.log(res));
      });
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
