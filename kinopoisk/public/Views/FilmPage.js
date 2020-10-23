import Base from './Base.js';
import FilmCard from '../components/FilmCard/FilmCard.js';

export default class FilmPage extends Base {
    #parent

    constructor(parent) {
      super(nav);
      this.#parent = parent;
    }

    render() {
      const body = document.getElementById('body');
      body.className = 'film1';
      this.#parent.innerHTML = '';
      this.#parent.className = '';
      const film = new FilmCard({
        parent: this.#parent,
      });
      film.render();
    }
}
