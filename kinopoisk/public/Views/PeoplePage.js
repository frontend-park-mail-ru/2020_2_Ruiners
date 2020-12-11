import { application, nav } from '../config';
import Button from '../Components/Button/Button';
import Profile from '../Components/Profile/Profile';
import Bus from '../modules/EventBus';
import Base from './Base';
import styles from '../static/CSS/main.scss';
import stylesButton from '../Components/Button/Button.scss';

export default class PeoplePage extends Base {
  constructor(parent, data) {
    super(nav);
    this.parent = parent;
    this.data = data;
  }

  render(id) {
    super.render(false);
    const responseBody = this.data;
    const body = document.getElementById('body');
    body.className = styles.main__background;
    this.parent.innerHTML = '';
    this.parent.className = '';
    const buttonSub = new Button({
      classname: stylesButton.buttons__forComments,
      parent: null,
    });
    const buttonUnsub = new Button({
      classname: stylesButton.buttons__forComments,
      parent: null,
    });
    const profile = new Profile({
      parent: this.parent,
      isProfile: false,
      body: {
        id: responseBody.id,
        Login: responseBody.login,
        isAuth: responseBody.isAuth,
        isSub: responseBody.isSub,
        buttonSub: buttonSub.template({
          classname: '',
          text: 'Подписаться',
          id: 'subscribe',
          type: 'submit',
          styles: stylesButton,
        }),
        buttonUnsub: buttonUnsub.template({
          classname: stylesButton.button__red,
          text: 'Отписаться',
          id: 'Unsubscribe',
          type: 'submit',
          styles: stylesButton,
        }),
      },
    });
    profile.render();
    const subscribe = document.getElementById('subscribe');
    if (subscribe) {
      const unsubscribe = document.createElement('button');
      const subButton = document.createElement('button');
      const par = subscribe.parentNode;

      const listenerSub = (evt) => {
        evt.preventDefault();
        subscribe.remove();
        unsubscribe.className = `${stylesButton.button} ${stylesButton.button__red}`;
        unsubscribe.textContent = 'Отписаться';
        par.appendChild(unsubscribe);
        Bus.emit('subscribe', id);
      };
      const listenerUnsub = (evt) => {
        evt.preventDefault();
        unsubscribe.remove();
        subButton.className = stylesButton.button;
        subButton.textContent = 'Подписаться';
        par.appendChild(subButton);
        Bus.emit('unsubscribe', id);
      };
      const listenerSubscribe = (evt) => {
        evt.preventDefault();
        subButton.remove();
        unsubscribe.className = `${stylesButton.button} ${stylesButton.button__red}`;
        unsubscribe.textContent = 'Отписаться';
        par.appendChild(unsubscribe);
        Bus.emit('subscribe', id);
      };
      subscribe.addEventListener('click', listenerSub);
      unsubscribe.addEventListener('click', listenerUnsub);
      subButton.addEventListener('click', listenerSubscribe);
      const box = this.createBox();
    } else {
      const unsub = document.getElementById('Unsubscribe');
      const unsubscribe = document.createElement('button');
      const subButton = document.createElement('button');
      const par = unsub.parentNode;

      const listenerSub = (evt) => {
        evt.preventDefault();
        unsub.remove();
        subButton.className = stylesButton.button;
        subButton.textContent = 'Подписаться';
        par.appendChild(subButton);
        Bus.emit('unsubscribe', id);
      };
      const listenerUnsub = (evt) => {
        evt.preventDefault();
        unsubscribe.remove();
        subButton.className = stylesButton.button;
        subButton.textContent = 'Подписаться';
        par.appendChild(subButton);
        Bus.emit('unsubscribe', id);
      };
      const listenerSubscribe = (evt) => {
        evt.preventDefault();
        subButton.remove();
        unsubscribe.className = `${stylesButton.button} ${stylesButton.button__red}`;
        unsubscribe.textContent = 'Отписаться';
        par.appendChild(unsubscribe);
        Bus.emit('subscribe', id);
      };
      unsub.addEventListener('click', listenerSub);
      unsubscribe.addEventListener('click', listenerUnsub);
      subButton.addEventListener('click', listenerSubscribe);
      const box = this.createBox();
    }
  }

  createBox() {
    const box = document.createElement('div');
    box.className = styles.invisible_box;
    box.id = 'box';
    this.parent.appendChild(box);
    return box;
  }
}
