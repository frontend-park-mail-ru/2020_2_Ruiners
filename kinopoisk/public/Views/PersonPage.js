import Base from './Base.js';
import PersonCard from '../Components/PersonCard/PersonCard.js';
import FilmLenta from '../Components/FilmLenta/FilmLenta.js';
import { nav, application } from '../config.js';
import styles from '../static/CSS/main.scss';

export default class PersonPage extends Base {
  constructor(context) {
    super(nav);
    const { parent, id } = context;
    this.parent = parent;
    this.id = id;
  }

  render(context) {
    const { personBody, filmBody } = context;
    super.render(false);
    const app = document.getElementById('body');
    app.className = styles.main__background;
    this.parent.innerHTML = '';
    const person = new PersonCard({ parent: this.parent, body: personBody });
    person.render();
    const lenta = new FilmLenta({
      genre: 'Фильмы с участием этого актера',
      body: filmBody,
      parent: application,
    });
    lenta.render();
    const box = document.createElement('div');
    box.className = styles.invisible_box;
    this.parent.appendChild(box);
  }
}
