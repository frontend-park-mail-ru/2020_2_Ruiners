export default class Navigate {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    const nav = document.createElement('nav');
    this.parent.appendChild(nav);
    return nav;
  }
}
