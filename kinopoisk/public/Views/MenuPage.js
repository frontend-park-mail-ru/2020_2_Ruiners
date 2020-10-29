import NavLink from '../Services/navLink.js';
import Base from './Base.js';
import FilmLenta from '../components/FilmLenta/FilmLenta.js';

export default class MenuPage extends Base {
    #parent

    constructor(parent) {
      super(nav);
      this.#parent = parent;
    }

    render() {
      super.render(false);
      this.#parent.innerHTML = '';
      this.#parent.className = '';
      const body = document.getElementById('body');
      body.className = 'main__black';
      if(!navigator.onLine) {
        const info = document.createElement('div');
        info.textContent = 'Нет подключения к интернету, но не беда! Можете посмотреть на лучшие фильмы на данный момент!';
        nav.insertAdjacentHTML('afterend', 'Нет подключения к интернету, но не беда! Можете посмотреть на лучшие фильмы на данный момент!');
      }
      const lentas = [
        {
          genre: 'Триллеры',
          parent: this.#parent,
        },
        {
          genre: 'Комедии',
          parent: this.#parent,
        },
        {
          genre: 'Ужастики',
          parent: this.#parent,
        },
      ];
      for (let i = 0; i < 3; i++) {
        const lenta = new FilmLenta(lentas[i]);
        lenta.render();
      }
    }
}
