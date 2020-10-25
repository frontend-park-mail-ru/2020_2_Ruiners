/* eslint no-param-reassign: ["error", { "props": false }] */
export function createDiv(className, parent) {
  const div = document.createElement('div');
  div.className = className;
  parent.appendChild(div);
  return div;
}
