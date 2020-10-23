import NavLink from '../Services/navLink.js';
import { createDiv } from './Components.js';
import Base from "./Base.js";
import Link from "../components/Link/Link.js";
import Bus from "../Services/EventBus.js";

export default class ProfilePage extends Base{
    #parent

    #data

    constructor(parent, data) {
      super(nav);
      this.#parent = parent;
      this.#data = data;
    }

    render() {
      const body = document.getElementById('body');
      body.className = 'page';
      const divshadow = createDiv('shadow profile', this.#parent);

      const ul = document.createElement('ul');
      ul.className = 'top-menu';
      divshadow.appendChild(ul);

      const menuItem0 = document.createElement('li');
      const menuItema0 = document.createElement('span');

      menuItema0.textContent = 'Профиль';

      menuItem0.appendChild(menuItema0);
      ul.appendChild(menuItem0);

      Object.keys(menuTop).forEach((menuKey) => {
        const { href, text } = menuTop[menuKey];
        const menuItem = document.createElement('li');
        const menuItema = new Link({
            parent: menuItem,
            classname: ''
        });
        menuItema.a.dataset.section = menuKey;
        menuItema.render();
        menuItema.placeContent(text);
        ul.appendChild(menuItem);
      });

      const divLeft = createDiv('profileInfoWrapLeft', divshadow);
      const divAvatar = createDiv('avatarUserBoxP', divLeft);

      const img = document.createElement('img');
      img.src = '/static/images/user-no-big.gif';
      divAvatar.appendChild(img);

      const button = document.createElement('button');
      button.className = 'buttons buttons__marginForFilmCard';
      button.textContent = 'Изменить данные';
      button.href = '/';
      const buttonLink = new NavLink(button);
      Bus.emit('profileChange', buttonLink);
      divLeft.appendChild(button);

      const divRight = createDiv('profileInfoWrapRight', divshadow);
      const divInfo = createDiv('infoUser', divRight);

      const nick = document.createElement('h1');
      nick.className = 'nick_name';

      const responseBody = JSON.parse(this.#data);
      nick.textContent = `${responseBody.Login}`;

      divInfo.appendChild(nick);

      const divInfoAuth = createDiv('infoUserAuth', divRight);

      const span1 = document.createElement('span');
      span1.textContent = 'Регистрация: 11 марта 2020';
      divInfoAuth.appendChild(span1);

      const span2 = document.createElement('span');
      span2.textContent = 'Рейтинг комментариев:';
      divInfoAuth.appendChild(span2);
    }
}
