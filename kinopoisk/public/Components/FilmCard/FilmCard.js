import Button from '../Button/Button.js';
import filmcardT from './FilmCard.handlebars';
import Bus from '../../modules/EventBus.js';

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
      classname: 'buttons__forComments',
      parent: null,
    });
    this.playlistButton = new Button({
      classname: 'buttons__forComments',
      parent: null,
    });
    this.template = filmcardT;
    this.mapRussian = [];
    this.mapRussian['Фантастика'] = 'fantasy';
    this.mapRussian['Комедия'] = 'comedy';
  }

  render() {
    this.parent.appendChild(this.card);
    let playlistBool = false;
    if(this.playlists.length > 0) {
      playlistBool = true;
    }
    this.card.innerHTML = this.template({
      isAuth: this.isAuthorized,
      playlistBool: playlistBool,
      playlists: this.playlists,
      title: this.body.title,
      description: this.body.Description,
      youtube: this.body.YoutubeLink,
      genres: [
        {
          rusGenre: this.body.MainGenre,
          genre: this.mapRussian[this.body.MainGenre],
        },
      ],
      actors: this.actors,
      countries: [
        this.body.country,
      ],
      rate: this.body.Rating,
      votes: this.body.SumVotes,
      MyRateBool: this.body.MyRateBool,
      MyRate: this.body.MyRate,
      stars: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      Button: this.voteButton.template({
        classname: 'buttons__marginForFilmCard',
        text: 'Оценить',
        id: 'vote',
        type: 'submit',
      }),
      ButtonPlaylist: this.playlistButton.template({
        classname: 'buttons__marginForFilmCard',
        text: 'Добавить',
        id: 'add',
        type: 'submit',
      }),
    });
    const button = document.getElementById('vote');
    const err = document.createElement('div');
    err.className = 'success succes__marginForFilmCard';
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
