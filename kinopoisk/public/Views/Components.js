
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