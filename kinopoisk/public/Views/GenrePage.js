import Base from './Base.js';
import filmService from '../Services/filmService.js';
import FilmLenta from '../Components/FilmLenta/FilmLenta.js';
import Bus from '../modules/EventBus.js';
import { nav } from '../config.js';

export default class LoginPage extends Base {
  constructor(context) {
    const { parent, genre } = context;
    super(nav);
    this.parent = parent;
    this.genre = genre;
    this.map = [];
    this.map.fantasy = 'Фантастика';
    this.map.comedy = 'Комедии';
  }

  render(responseBody) {
    super.render(false);
    this.parent.innerHTML = '';
    const body = document.getElementById('body');
    body.className = 'page';
    const lenta = new FilmLenta({
      genre: this.getRussian(this.genre),
      body: responseBody,
      parent: this.parent,
    });
    lenta.render();
  }

  getRussian(genre) {
    return this.map[genre];
  }
}
