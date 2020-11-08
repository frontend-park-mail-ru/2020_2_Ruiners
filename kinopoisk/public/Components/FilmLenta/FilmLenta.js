import FilmPoster from "../FilmPoster/FilmPoster.js";
import  filmLentaT from './FilmLenta.handlebars'
export default class FilmLenta {

    constructor(context = {}) {
      const { genre, parent, body } = context;
      this.genre = genre;
      this.parent = parent;
      this.body = body;
      this.lenta = document.createElement('div');
      this.template = filmLentaT;
      const posters = [];
      for( let i = 0; i < this.body.length; i++) {
          const poster = new FilmPoster(this.body[i]);
          posters[i] = poster.render();
      }
      this.posters = posters;
    }

    render() {
        this.parent.appendChild(this.lenta);
        this.lenta.innerHTML = this.template({
            genre: this.genre,
            posters: this.posters
        })
    }
}
