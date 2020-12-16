import Base from './Base.js';
import FilmLenta from '../Components/FilmLenta/FilmLenta.js';
import filmService from '../Services/filmService.js';
import Bus from '../modules/EventBus.js';
import { nav, application } from '../config.js';
import styles from '../static/CSS/main.scss';
import stylesFilmLenta from '../Components/FilmLenta/FilmLenta.scss';
import MenuFilm from '../Components/MenuFilm/MenuFilm';

export default class MenuPage extends Base {
  constructor(parent) {
    super(nav);
    this.parent = parent;
  }

  render(film) {
    super.render(false);
    const body = document.getElementById('body');
    body.className = styles.menu__background;
    body.style.backgroundImage = `linear-gradient(to top, rgba(46, 46, 46, 1) 0%, rgba(46, 46, 46, 0.8) 20%, rgba(46, 46, 46, 0.6) 40%, rgba(46, 46, 46, 0.4) 60%, rgba(46, 46, 46, 0) 80%), url(${film.big_img})`;
    this.parent.innerHTML = '';
    this.parent.className = '';
    const menuFilm = new MenuFilm({
      parent: application,
      body: film,
    });
    menuFilm.render();
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
