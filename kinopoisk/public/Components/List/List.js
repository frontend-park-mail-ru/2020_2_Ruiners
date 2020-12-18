import styles from './List.scss';

export default class List {
  constructor(context) {
    const { parent, classname } = context;
    this.li = document.createElement('li');
    this.parent = parent;
    this.classname = classname;
  }

  render() {
    this.parent.appendChild(this.li);
    this.li.className = styles[this.classname];
    return this.li;
  }

  placeContent(inner) {
    this.li.innerHTML = inner;
  }
}
