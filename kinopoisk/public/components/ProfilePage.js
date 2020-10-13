import NavLink from './navLink.js';
import { createA, createDiv } from './Components.js';

export default class ProfilePage {
    #parent

    #data

    constructor(parent, data) {
      this.#parent = parent;
      this.#data = data;
    }

    render(ProfileChange) {
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
        const menuItema = createA('/', text);
        menuItema.dataset.section = menuKey;
        menuItem.appendChild(menuItema);
        ul.appendChild(menuItem);
      });

      const divLeft = createDiv('profileInfoWrapLeft', divshadow);
      const divAvatar = createDiv('avatarUserBoxP', divLeft);

      const img = document.createElement('img');
      img.src = '/static/images/user-no-big.gif';
      divAvatar.appendChild(img);

      const button = document.createElement('button');
      button.className = 'secondary';
      button.textContent = 'Изменить данные';
      button.href = '/';
      const buttonLink = new NavLink(button);
      buttonLink.render('click', ProfileChange);
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
