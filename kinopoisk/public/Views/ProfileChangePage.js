import NavLink from '../modules/navLink.js';
import Bus from '../modules/EventBus.js';
import Form from '../Components/Form/Form.js';
import Base from './Base.js';
import userService from '../Services/userService.js';
import Button from '../Components/Button/Button.js';
import UserService from '../Services/userService.js';
import { nav } from '../config.js';
import styles from '../static/CSS/main.scss';
import stylesForm from '../Components/Form/Form.scss';
import stylesProfile from '../Components/Profile/Profile.scss';
import stylesButton from '../Components/Button/Button.scss';

export default class ProfileChangePage extends Base {
  constructor(parent, data) {
    super(nav);
    this.parent = parent;
    this.data = data;
  }

  render() {
    super.render(false);
    const body = document.getElementById('body');
    body.className = styles.main__background;
    body.style.backgroundImage = 'url(\'images/login.jpg\')';
    const settingsBox = document.createElement('div');
    settingsBox.className = styles.margin + " " + stylesForm.chenge;
    this.parent.appendChild(settingsBox);
    const responseBody = JSON.parse(this.data);

    const headLogin = {
      head: true,
      textContent: 'Изменить логин',
      style: 'color:#FFFFFF; margin-left: 10px; font-size:1.5em',
    };

    const configInputLogin = [
      {
        type: 'login',
        name: 'login',
        text: `${responseBody.login}`,
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
    settingsBox.appendChild(form);
    const Password = document.createElement('h2');
    Password.className = stylesProfile.settings_header;
    Password.textContent = 'Изменить Пароль';
    settingsBox.appendChild(Password);

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
    const formPass = formr[0];
    settingsBox.appendChild(formPass);
    const Avatar = document.createElement('h2');
    Avatar.className = stylesProfile.settings_header;
    Avatar.textContent = 'Изменить аватарку';
    settingsBox.appendChild(Avatar);
    const err = document.createElement('div');
    err.className = styles.error;

    const configAvatar = [
      {
        type: 'file',
        name: 'file',
        text: 'фото',
        required: true,
        valid: false,
        accept: 'image/*',
      }];

    const subAvatar = {
      text: 'Изменить аватар',
      className: 'secondary',
    };
    const formrendAvatar = new Form(head, configAvatar, subAvatar);
    const formrAvatar = formrendAvatar.render();
    // const formrAvatar = renderForm(head, configAvatar, subAvatar);
    const formAvatar = formrAvatar[0];
    settingsBox.appendChild(formAvatar);
    const formData = new FormData();
    const buttonSave = new Button({
      parent: settingsBox,
      classname: stylesButton.buttons__marginForFilmCard,
      text: 'Сохранить',
    });
    Bus.emit('Save', ({
      buttonSave,
      form,
      formPass,
      formData,
      formAvatar,
      formrLogin,
      formr,
      formrAvatar,
      base: super.render,
    }));
  }

  createBox() {
    const box = document.createElement('div');
    box.className = styles.invisible_box;
    this.parent.appendChild(box);
  }
}
