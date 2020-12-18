import footerT from './Footer.handlebars';
import styles from './Footer.scss';

export default class Footer {
  constructor() {
    this.footer = document.createElement('div');
    this.template = footerT;
  }

  render() {
    const foot = document.getElementById('footer');
    if (foot !== undefined) {
      foot.innerHTML = '';
    }
    this.footer.innerHTML = this.template({
      styles,
    });
    const body = document.getElementById('body');
    body.appendChild(this.footer);
  }
}
