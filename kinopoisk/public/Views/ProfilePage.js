import NavLink from '../modules/navLink.js';
import { createDiv } from './Components.js';
import Bus from '../modules/EventBus.js';
import Base from './Base.js';
import { domain, nav } from "../config.js";

export default class ProfilePage extends Base {
  constructor(parent, data) {
    super(nav);
    this.parent = parent;
    this.data = data;
  }

  render(context) {
    const { id } = context
    const responseBody = JSON.parse(this.data);
    console.log(id);
    if(id === 1) {
      super.render(true);
    } else {
      super.render(false);
    }
    const body = document.getElementById('body');
    body.className = 'main__background';
    body.style.backgroundImage = `linear-gradient(to top, rgba(46, 46, 46, 1) 0%, rgba(46, 46, 46, 0.8) 20%, rgba(46, 46, 46, 0.6) 40%, rgba(46, 46, 46, 0.4) 60%, rgba(46, 46, 46, 0.2) 80%, rgba(46, 46, 46, 0) 100%), url(\'images/login.jpg\')`;
    this.parent.className = '';
    const divshadow = createDiv('shadow profile', this.parent);

    const ul = document.createElement('ul');
    ul.className = 'top-menu';
    divshadow.appendChild(ul);

    const menuItem0 = document.createElement('li');
    const menuItema0 = document.createElement('span');

    menuItema0.textContent = 'Профиль';

    const divLeft = createDiv('profileInfoWrapLeft', divshadow);
    const divAvatar = createDiv('avatarUserBoxP', divLeft);

    const img = document.createElement('img');
    img.src = `${domain}/user/avatar/${`${responseBody.id}?${Math.random()}`}`;
    img.height = 300;
    img.width = 300;
    img.className = 'avatar__image';
    divAvatar.appendChild(img);

    const button = document.createElement('button');
    button.className = 'button buttons__marginForSettings';
    button.textContent = 'Изменить данные';
    button.href = '/';
    const buttonLink = new NavLink(button);
    Bus.emit('profileChange', buttonLink);
    divLeft.appendChild(button);

    const divRight = createDiv('profileInfoWrapRight', divshadow);
    const divInfo = createDiv('infoUser', divRight);

    const nick = document.createElement('h1');
    nick.className = 'profile__nickname';

    nick.textContent = `${responseBody.Login}`;

    divInfo.appendChild(nick);
  }
}
