/* eslint no-param-reassign: ["error", { "props": false }] */

function createA(href, text) {
  const a = document.createElement('a');
  a.href = href;
  a.textContent = text;
  return a;
}

function createSpan(classname, text) {
  const span = document.createElement('span');
  span.className = classname;
  span.textContent = text;
  return span;
}

function createInput(type, name, text) {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.placeholder = text;
  return input;
}

function createInputSubmit(value, className) {
  const input = document.createElement('input');
  input.type = 'submit';
  input.className = className;
  input.value = value;
  return input;
}

function createDiv(className, parent) {
  const div = document.createElement('div');
  div.className = className;
  parent.appendChild(div);
  return div;
}

function createLi(className, child) {
  const li = document.createElement('li');
  li.className = className;
  li.appendChild(child);
  return li;
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

function renderForm(head, configInput, sub) {
  const form = document.createElement('form');
  const formr = [];
  formr.push(form);

  if (head.head) {
    const header = document.createElement('h2');
    header.textContent = head.textContent;
    header.style = head.style;
    form.appendChild(header);
  }

  configInput.forEach((menuKey) => {
    const input = createInput(menuKey.type, menuKey.name, menuKey.text);
    input.required = menuKey.required;
    form.appendChild(input);
    formr.push(input);
  });
  const submitpass = createInputSubmit(sub.text, sub.className);
  form.appendChild(submitpass);

  let i = 1;
  configInput.forEach((menuKey) => {
    if (menuKey.valid) {
      valid(form, menuKey.reg, formr[i], menuKey.errorVal);
    }
    ++i;
  });
  return formr;
}
