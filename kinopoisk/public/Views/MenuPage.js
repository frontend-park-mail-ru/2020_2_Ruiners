import Base from './Base.js';
import FilmLenta from '../Components/FilmLenta/FilmLenta.js';
import filmService from '../Services/filmService.js';
import Bus from '../modules/EventBus.js';
import { nav, application } from '../config.js';
import styles from '../static/CSS/main.scss';
import stylesFilmLenta from '../Components/FilmLenta/FilmLenta.scss';

export default class MenuPage extends Base {
  constructor(parent) {
    super(nav);
    this.parent = parent;
  }

  render() {
    super.render(false);
    this.parent.innerHTML = '';
    this.parent.className = '';
    const body = document.getElementById('body');
    body.className = stylesFilmLenta.main__black;
    const lentas = [
      {
        rusGenre: 'Фантастика',
        genre: 'fantasy',
        parent: this.parent,
      },
      {
        rusGenre: 'Комедии',
        genre: 'comedy',
        parent: this.parent,
      },
      {
        rusGenre: 'Ужасы',
        genre: 'horror',
        parent: this.parent,
      },
      {
        rusGenre: 'Драма',
        genre: 'drama',
        parent: this.parent,
      },
      {
        rusGenre: 'Боевики',
        genre: 'war',
        parent: this.parent,
      },
      {
        rusGenre: 'Триллеры',
        genre: 'triller',
        parent: this.parent,
      },
    ];
    Bus.emit('MenuFilms', {
      lentas,
      call: (responseBody, res, j, i) => {
        if (res.ok) {
          const lenta = new FilmLenta({
            genre: lentas[i].rusGenre,
            body: responseBody,
            parent: application,
          });
          lenta.render();
        } else {
          this.menuPage();
        }
        if (j === lentas.length - 1) {
          this.createBox();
        }
      },
    });
  }

  createBox() {
    const box = document.createElement('div');
    box.className = styles.invisible_box;
    this.parent.appendChild(box);
  }
}
