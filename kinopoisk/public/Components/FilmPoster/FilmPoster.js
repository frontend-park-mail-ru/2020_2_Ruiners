import filmPosterT from './FilmPoster.handlebars';
import styles from './FilmPoster.scss';

export default class FilmPoster {
  constructor(context = {}) {
    const {
      title, main_genre, year, small_img, id, del, playlist,
    } = context;
    this.title = title;
    this.genre = main_genre;
    this.image = small_img;
    this.year = year;
    this.id = id;
    this.poster = document.createElement('div');
    this.del = del;
    this.playlist = playlist;
    this.template = filmPosterT;
  }

  render() {
    return this.template({
      styles,
      id: this.id,
      title: this.title,
      MainGenre: this.genre,
      year: this.year,
      SmallImg: this.image,
      del: this.del,
      playlist: this.playlist,
    });
  }
}
