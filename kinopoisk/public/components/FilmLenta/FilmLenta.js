import FilmPoster from '../FilmPoster/FilmPoster.js';
import navLink from '../../Services/navLink.js';
import { filmPage } from '../../main.js';

export default class FilmLenta {
    lenta;

    template;

    #parent;

    #genre;

    #posters;

    #films;

    constructor(context = {}) {
      const { genre, parent } = context;
      this.#genre = genre;
      this.#parent = parent;
      this.lenta = document.createElement('div');
      this.template = Handlebars.templates.FilmLenta;
      this.#films = [ // Получение из базы данных
        {
          title: 'Начало',
          genre: 'Триллер',
          year: 2010,
          image: 'static/images/nachalo.jpg',
        },
        {
          title: 'Мачо и ботан',
          genre: 'Комедия',
          year: 2012,
          image: 'static/images/Macho.jpg',
        },
        {
          title: 'Человек-невидимка',
          genre: 'Ужастик',
          year: 2020,
          image: 'static/images/nevidimka.jpg',
        },
      ];
      const posters = [];
      if (this.#genre === 'Триллеры') {
        for (let i = 0; i < 5; i++) {
          const poster = new FilmPoster(this.#films[0]);
          posters[i] = poster.render();
        }
      }
      if (this.#genre === 'Комедии') {
        for (let i = 0; i < 5; i++) {
          const poster = new FilmPoster(this.#films[1]);
          posters[i] = poster.render();
        }
      }
      if (this.#genre === 'Ужастики') {
        for (let i = 0; i < 5; i++) {
          const poster = new FilmPoster(this.#films[2]);
          posters[i] = poster.render();
        }
      }
      this.#posters = posters;
    }

    render() {
      this.#parent.appendChild(this.lenta);
      this.lenta.innerHTML = this.template({
        genre: this.#genre,
        posters: this.#posters,
      });
      if (this.#genre === 'Триллеры') {
        const href = document.getElementById(this.#films[0].title);
        const hrefLink = new navLink(href);
        hrefLink.render('click', filmPage);
      }
      if (this.#genre === 'Комедии') {
        const href = document.getElementById(this.#films[1].title);
        const hrefLink = new navLink(href);
        hrefLink.render('click', filmPage);
      }
      if (this.#genre === 'Ужастики') {
        const href = document.getElementById(this.#films[2].title);
        const hrefLink = new navLink(href);
        hrefLink.render('click', filmPage);
      }
    }
}
