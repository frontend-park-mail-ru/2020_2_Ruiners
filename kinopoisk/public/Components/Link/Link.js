import styles from './Link.scss';

export default class Link {
  constructor(context) {
    const { parent, classname, pathname } = context;
    this.a = document.createElement('a');
    this.parent = parent;
    this.classname = classname;
    this.pathname = pathname;
  }

  render() {
    this.a.className = styles[this.classname];
    this.a.href = this.pathname;
    this.parent.appendChild(this.a);
    return this.a;
  }

  placeContent(inner) {
    this.a.innerHTML = inner;
    return this.a;
  }
}
