import FilmPoster from '../FilmPoster/FilmPoster.js';
import filmLentaT from './FilmLenta.handlebars';
import Delete from '../Delete/Delete.js';
import stylesDelete from '../Delete/Delete.scss';
import stylesFPoster from '../FilmPoster/FilmPoster.scss';
import styles from './FilmLenta.scss';

export default class FilmLenta {
  constructor(context = {}) {
    const {
      genre, parent, body, playlist, id,
    } = context;
    this.id = id;
    this.playlist = playlist;
    this.genre = genre;
    this.parent = parent;
    this.body = body;
    this.lenta = document.createElement('div');
    this.template = filmLentaT;
    const posters = [];
    if (!this.playlist) {
      for (let i = 0; i < this.body.length; i++) {
        const poster = new FilmPoster(this.body[i]);
        posters[i] = poster.render();
      }
    } else {
      for (let i = 0; i < this.body.length; i++) {
        const del = new Delete({ parent: this.parent, id: 1 });
        this.body[i].del = del.template({ id: this.body[i].id,
          what: `poster/${this.id}`,
          styles: stylesDelete,
        });
        this.body[i].playlist = this.playlist;
        const poster = new FilmPoster(this.body[i]);
        posters[i] = poster.render();
      }
    }
    this.posters = posters;
  }

  render() {
    const del = new Delete({
      id: 1,
      parent: this.parent,
    });
    this.parent.appendChild(this.lenta);
    this.lenta.innerHTML = this.template({
      stylesFPoster: stylesFPoster,
      styles: styles,
      playlist: this.playlist,
      genre: this.genre,
      posters: this.posters,
      del: del.template({ id: this.id,
         what: 'playlist',
         styles: stylesDelete,
        }),
    });
  }

  hide() {
    this.lenta.innerHTML = '';
  }
}
