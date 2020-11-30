import Button from '../Button/Button.js';
import Bus from '../../modules/EventBus.js';
import windowT from './Window.handlebars';

export default class Window {
  constructor(context = {}) {
    const { parent } = context;
    this.parent = parent;
    this.windowEl = document.createElement('div');
    this.template = windowT;
  }

  render(callback) {
    this.parent.appendChild(this.windowEl);
    this.windowEl.innerHTML = this.template();
    const okno = document.getElementById('okno');
    const buttonProfile = new Button({
      parent: okno,
      classname: '',
      text: 'Профиль',
    });
    const buttonSetting = new Button({
      parent: okno,
      classname: '',
      text: 'Настройки',
    });
    buttonProfile.render({
      callback: () => {
        Bus.emit('loginPasswordChange', (buttonProfile));
      },
    });
    buttonSetting.render({
      callback: () => {
        Bus.emit('Change', buttonSetting);
      },
    });
  }

  close() {
    this.windowEl.innerHTML = '';
  }
}
