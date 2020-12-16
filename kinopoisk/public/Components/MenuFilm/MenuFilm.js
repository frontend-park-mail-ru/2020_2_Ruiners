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
    const button = new Button({});
    this.film.innerHTML = this.template({
      body: this.body,
      styles: styles,
      button: button.template({
        id: 'menuFilm',
        text: 'Подробнее',
        styles: button.styles,
      }),
    });
  }
}
