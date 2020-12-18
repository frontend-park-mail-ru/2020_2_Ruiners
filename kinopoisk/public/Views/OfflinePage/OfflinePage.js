import OfflinePageT from './OfflinePage.handlebars';
import styles from './OfflinePage.scss';

export default class OfflinePage {
  constructor(parent) {
    this.parent = parent;
    this.page = document.createElement('div');
    this.template = OfflinePageT;
  }

  render() {
    this.parent.innerHTML = '';
    const body = document.getElementById('body');
    body.className = styles.offline_background;
    this.parent.appendChild(this.page);
    this.page.innerHTML = this.template({
      styles,
    });
  }
}
