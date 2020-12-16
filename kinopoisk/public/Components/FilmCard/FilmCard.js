import Button from '../Button/Button.js';
import filmcardT from './FilmCard.handlebars';
import Bus from '../../modules/EventBus.js';
import styles from './FilmCard.scss';
import stylesMain from '../../static/CSS/main.scss';
import mapRussian from '../../modules/mapRussian';

export default class FilmCard {
  constructor(context = {}) {
    const {
      parent, body, isAuthorized, actors, playlists,
    } = context;
    this.card = document.createElement('div');
    this.parent = parent;
    this.body = body;
    this.isAuthorized = isAuthorized;
    this.actors = actors;
    this.playlists = playlists;
    this.voteButton = new Button({
      templateClass: 'buttons__marginForFilmCard',
      text: 'Оценить',
      id: 'vote',
      type: 'submit',
      parent: null,
    });
    this.playlistButton = new Button({
      templateClass: 'buttons__marginForFilmCard',
      text: 'Добавить',
      id: 'add',
      type: 'submit',
      parent: null,
    });
    this.template = filmcardT;
  }

  render() {
    this.parent.appendChild(this.card);
    let playlistBool = false;
    if (this.playlists.length > 0) {
      playlistBool = true;
    }
    this.card.innerHTML = this.template({
      styles,
      isAuth: this.isAuthorized,
      playlistBool,
      playlists: this.playlists,
      title: this.body.title,
      description: this.body.description,
      youtube: this.body.youtube_link,
      genres: [
        {
          rusGenre: this.body.main_genre,
          genre: mapRussian.get(this.body.main_genre),
        },
      ],
      actors: this.actors,
      countries: [
        this.body.country,
      ],
      rate: this.body.rating,
      votes: this.body.sum_votes,
      MyRateBool: this.body.MyRateBool,
      MyRate: this.body.MyRate,
      stars: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      Button: this.voteButton.getTemplate(),
      ButtonPlaylist: this.playlistButton.getTemplate(),
    });
    const button = document.getElementById('vote');
    const err = document.createElement('div');
    err.className = `${stylesMain.success} ${stylesMain.succes__marginForFilmCard}`;
    if (this.isAuthorized) {
      button.addEventListener('click', (event) => {
        for (let i = 1; i <= 10; i++) {
          const star = document.getElementById(`star-${i}`);
          if (star.checked) {
            Bus.emit('Rate', {
              id: this.body.id,
              index: i,
              err,
              card: this.card,
            });
          }
        }
      });
    }
  }
}
