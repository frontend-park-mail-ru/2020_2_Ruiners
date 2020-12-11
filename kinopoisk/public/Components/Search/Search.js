import searchT from './Search.handlebars';
// import './Search.scss';
import styles from './Search.scss';

export default class Search {
  constructor(context) {
    const { parent } = context;
    this.search = document.createElement('div');
    this.parent = parent;
    this.template = searchT;
  }

  render() {
    this.parent.appendChild(this.search);
    this.search.innerHTML = this.template({styles: styles,});
    const obj = document.getElementById('search');
    obj.style.backgroundImage = 'url(\'images/search1.png\')';
  }
}
