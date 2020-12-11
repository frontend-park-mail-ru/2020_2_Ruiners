import Base from './Base';
import { nav } from '../config';
import Search from '../Components/Search/Search';
import Bus from '../modules/EventBus';
import FilmLenta from '../Components/FilmLenta/FilmLenta';
import styles from '../static/CSS/main.scss';

export default class SearchPage extends Base {
  constructor(context) {
    const { parent } = context;
    super(nav);
    this.parent = parent;
  }

  render() {
    super.render(false);
    this.parent.innerHTML = '';
    const body = document.getElementById('body');
    body.className = styles.page;
    const search = new Search({
      parent: this.parent,
    });
    search.render();
    const searchInput = document.getElementById('search');
    const content = document.getElementById('content');
    searchInput.addEventListener('keypress', (evt) => {
      let str = searchInput.value + String.fromCharCode(evt.charCode);
      Bus.emit('search', {
        str: str,
        call: (responseBody) => {
          console.log(responseBody);
          content.innerHTML = '';
          const lenta = new FilmLenta({
            parent: content,
            genre: str,
            body: responseBody,
          });
          lenta.render();
          this.createBox(content);
        },
      });
    });
  }

  createBox(par) {
    const box = document.createElement('div');
    box.className = styles.invisible_box;
    box.id = 'box';
    par.appendChild(box);
    return box;
  }

}
