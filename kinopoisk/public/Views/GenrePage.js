import Base from './Base.js';
import FilmLenta from '../Components/FilmLenta/FilmLenta.js';
import { nav } from '../config.js';
import styles from '../static/CSS/main.scss';
import { MapRussian } from '../modules/mapRussian';

export default class LoginPage extends Base {
  constructor(context) {
    const { parent, genre } = context;
    super(nav);
    this.parent = parent;
    this.genre = genre;
  }

  render(responseBody) {
    super.render(false);
    this.parent.innerHTML = '';
    const body = document.getElementById('body');
    body.className = styles.page;
    const lenta = new FilmLenta({
      genre: MapRussian[this.genre],
      body: responseBody,
      parent: this.parent,
    });
    lenta.render();
  }
}
