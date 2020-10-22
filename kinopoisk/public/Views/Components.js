/* eslint no-param-reassign: ["error", { "props": false }] */

import Button from "../components/Button/Button.js";

export function createInput(type, name, text) {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.placeholder = text;
  return input;
}

export function createDiv(className, parent) {
  const div = document.createElement('div');
  div.className = className;
  parent.appendChild(div);
  return div;
}

function valid(form, reg, input, text) {
  const diver = createDiv('error', form);
  input.onblur = function () {
    if (!reg.test(this.value)) {
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

export function renderForm(headConf, configInput, sub) {
  const { head, textContent, style } = headConf;
  const form = document.createElement('form');
  const formr = [];
  formr.push(form);

  if (head) {
    const header = document.createElement('h2');
    header.textContent = textContent;
    header.style = style;
    form.appendChild(header);
  }

  configInput.forEach((menuKey) => {
    const { type, name, text, required } = menuKey;
    const input = createInput(type, name, text);
    input.required = required;
    form.appendChild(input);
    formr.push(input);
  });
  const { text, className} = sub
  const submitpass = new Button({
      parent: form,
      text: text,
      classname: 'buttons buttons__margin',
      type: 'submit'
  });
  submitpass.renderSubmit();

  let i = 1;
  configInput.forEach((menuKey) => {
    const { reg, errorVal } = menuKey;
    if (menuKey.valid) {
      valid(form, reg, formr[i], errorVal);
    }
    i += 1;
  });
  return formr;
}
