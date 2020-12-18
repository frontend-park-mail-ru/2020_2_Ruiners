import styles from './PersonLenta.scss';
import personLentaT from './PersonLenta.handlebars';

export default class PersonLenta {
  constructor(context) {
    const { parent, body } = context;
    this.body = body;
    this.template = personLentaT;
    this.parent = parent;
    this.lenta = document.createElement('div');
  }

  render() {
    this.parent.appendChild(this.lenta);
    this.lenta.innerHTML = this.template({
      styles,
      persons: this.body,
    });
  }

  hide() {
    this.lenta.innerHTML = '';
  }
}
