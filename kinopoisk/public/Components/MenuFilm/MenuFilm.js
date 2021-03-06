import menuFilmT from './MenuFilm.handlebars';
import styles from './MenuFilm.scss';
import Button from '../Button/Button';

export default class MenuFilm {
  constructor(context) {
    const { parent, body } = context;
    this.parent = parent;
    this.body = body;
    this.template = menuFilmT;
    this.film = document.createElement('div');
  }

  render() {
    this.parent.appendChild(this.film);
    const button = new Button({
      id: 'menuFilm',
      text: 'Подробнее',
    });
    let isZero = false;
    if (this.body.rating === 0) {
      isZero = true;
    }
    this.film.innerHTML = this.template({
      isZero: isZero,
      body: this.body,
      styles,
      button: button.getTemplate(),
    });
  }
}
