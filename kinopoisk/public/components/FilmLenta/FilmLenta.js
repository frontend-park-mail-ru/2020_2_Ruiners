import FilmPoster from "../FilmPoster/FilmPoster.js";
import navLink from "../../Services/navLink.js";
import Bus from "../../Services/EventBus.js";

export default class FilmLenta {
    lenta;

    template;

    #body;

    #parent;

    #genre;

    #posters;

    constructor(context = {}) {
      const { genre, parent, body } = context;
      this.#genre = genre;
      this.#parent = parent;
      this.#body = body;
      this.lenta = document.createElement('div');
      this.template = Handlebars.templates.FilmLenta;
      const posters = [];
      for( let i = 0; i < this.#body.length; i++) {
          const poster = new FilmPoster(this.#body[i]);
          posters[i] = poster.render();
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
