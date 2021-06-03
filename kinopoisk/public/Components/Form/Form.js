import { createDiv } from '../../Views/Components.js';
import styles from '../../static/CSS/main.scss';
import stylesForm from './Form.scss';

export default class Form {
  createInput(type, name, text) {
    const input = document.createElement('input');
    input.type = type;
    input.name = name;
    if (type === 'file') {
      input.className = stylesForm.Avatar;
    }
    input.placeholder = text;
    return input;
  }

  valid(form, reg, input, text) {
    const diver = createDiv(styles.error, form);
    input.onblur = function () {
      if (this.value.length < reg.min || this.value.length > reg.max) {
        this.classList.add('invalid');
        diver.innerHTML = text;
      }
    };

    input.onfocus = function () {
      if (this.classList.contains('invalid')) {
        this.classList.remove('invalid');
        diver.innerHTML = '';
      }
    };
  }

  constructor(headConf, configInput, sub) {
    this.headConf = headConf;
    this.configInput = configInput;
    this.sub = sub;
  }

  render() {
    const { head, textContent, style } = this.headConf;
    const form = document.createElement('form');
    const formr = [];
    formr.push(form);

    if (head) {
      const header = document.createElement('h2');
      header.textContent = textContent;
      header.style = style;
      form.appendChild(header);
    }

    this.configInput.forEach((menuKey) => {
      const {
        type, name, text, required, accept,
      } = menuKey;
      const input = this.createInput(type, name, text);
      if (type === 'file') {
        input.accept = accept;
      }
      input.required = required;
      form.appendChild(input);
      formr.push(input);
    });

    let i = 1;
    this.configInput.forEach((menuKey) => {
      const { reg, errorVal } = menuKey;
      if (menuKey.valid) {
        this.valid(form, reg, formr[i], errorVal);
      }
      i += 1;
    });
    return formr;
  }
}
