import FilmPoster from "../FilmPoster/FilmPoster.js";
import navLink from "../../Services/navLink.js";
import Bus from "../../Services/EventBus.js";

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
          id: 1,
          title: 'Начало',
          genre: 'Триллер',
          year: 2010,
          image: 'static/images/nachalo.jpg',
        },
        {
          id: 2,
          title: 'Мачо и ботан',
          genre: 'Комедия',
          year: 2012,
          image: 'static/images/Macho.jpg',
        },
        {
          id: 3,
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
            posters: this.#posters
        })
    }
}
