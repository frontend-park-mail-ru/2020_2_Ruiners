import buttonT from './Button.handlebars';
import styles from './Button.scss';

export default class Button {
  constructor(context = {}) {
    const {
      classname, text, parent, type, id,
    } = context;
    this.button = document.createElement('div');
    this.classname = classname;
    this.text = text;
    this.parent = parent;
    this.template = buttonT;
    this.type = type;
    this.id = id;
  }

  render(context = {}) {
    const { callback } = context;
    this.parent.appendChild(this.button);
    this.button.innerHTML = this.template({
      classname: this.classname,
      type: this.type,
      text: this.text,
      id: this.id,
      styles,
    });
    if (callback) {
      this.listener = (evt) => {
        evt.preventDefault();
        callback(evt);
      };
      this.button.addEventListener('click', this.listener);
    }
  }

  hide() {
    this.button.innerHTML = '';
    this.button.removeEventListener('click', this.listener);
  }

  renderSubmit() {
    this.button = document.createElement('button');
    this.button.className = this.classname;
    this.button.textContent = this.text;
    this.button.type = this.type;
    this.parent.appendChild(this.button);
  }
}
