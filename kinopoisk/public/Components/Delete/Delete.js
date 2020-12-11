import deleteT from './Delete.handlebars';
import styles from './Delete.scss';

export default class Delete {
  constructor(context) {
    const { id, what, parent } = context;
    this.delete = document.createElement('div');
    this.what = what;
    this.template = deleteT;
    this.parent = parent;
    this.id = id;
  }

  render() {
    this.parent.appendChild(this.delete);
    this.delete.innerHTML = this.template({
      id: this.id,
      what: this.what,
      styles,
    });
  }
}
