import NavLink from '../Services/navLink.js';
import Bus from "../Services/EventBus.js";
import Form from '../components/Form/Form.js';
import Base from './Base.js';
import userService from '../Services/userService.js';
import Button from "../components/Button/Button.js";

export default class ProfileChangePage extends Base {
    #parent

    #data

    constructor(parent, data) {
      super(nav);
      this.#parent = parent;
      this.#data = data;
    }

    render() {
      super.render(false);
      const body = document.getElementById('body');
      body.className = 'page';

      this.#parent.className = 'wrapper__form chenge margin';

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

      const formrend = new Form(headLogin, configInputLogin, subLogin);
      const formrLogin = formrend.render();
      // const formrLogin = renderForm(headLogin, configInputLogin, subLogin);
      const form = formrLogin[0];
      this.#parent.appendChild(form);

      const formLink = new NavLink(form);
      formLink.render('submit', () => {
        if (!formrLogin[1].classList.contains('invalid')) {
          const login = formrLogin[1].value.trim();
          userService.ChangeLogin(login)
            .then((res) => {
              if (res.ok) {
                nav.innerHTML = '';
                super.render();
                Bus.emit('loginPasswordChange', res);
              } else {
                alert(res.errmsg);
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
          errorVal: '',
        },
      ];

      const sub = {
        text: 'Изменить пароль',
        className: 'secondary',
      };

      const formrendpath = new Form(head, configInput, sub);
      const formr = formrendpath.render();
      // const formr = renderForm(head, configInput, sub);
      const formPass = formr[0];
      this.#parent.appendChild(formPass);

      const formPassLink = new NavLink(formPass);
      const err = document.createElement('div');
      err.className = 'error';
      formPassLink.render('submit', () => {
        if (!formr[2].classList.contains('invalid')
                || !formr[3].classList.contains('invalid')) {
          const PasswordOld = formr[1].value.trim();
          const Password = formr[2].value.trim();
          const pass = formr[3].value.trim();
          if (Password === pass) {
            userService.ChangePassword(PasswordOld, Password)
              .then((res) => {
                if (res.ok) {
                  Bus.emit('loginPasswordChange', res);
                } else {
                  formPass.appendChild(res.errmsg);
                }
              });
          } else {
            err.innerHTML = 'Пароли не совпадают';
            formPass.appendChild(err);
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
        }];

      const subAvatar = {
        text: 'Изменить аватар',
        className: 'secondary',
      };
      const formrendAvatar = new Form(head, configAvatar, subAvatar);
      const formrAvatar = formrendAvatar.render();
      // const formrAvatar = renderForm(head, configAvatar, subAvatar);
      const formAvatar = formrAvatar[0];
      this.#parent.appendChild(formAvatar);
      const formData = new FormData();
      const formAvatarLink = new NavLink(formAvatar);
      formAvatarLink.render('submit', () => {
        console.log(formrAvatar[1].files[0]);
        formData.append('file', formrAvatar[1].files[0]);
        console.log(formData.getAll('file'));
        fetch('http://95.163.208.72:8000/changeAvatar', {
          method: 'POST',
          credentials: 'include',
          mode: 'cors',
          body: formData,
        }).then((response) => response.status).then((res) => console.log(res));
      });
      const buttonBack = new Button({
          parent: this.#parent,
          classname: 'buttons buttons__marginForFilmCard',
          text: 'Назад'
      })
      Bus.emit('Back', buttonBack);
    }
}
