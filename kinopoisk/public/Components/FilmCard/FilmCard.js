import Button from '../Button/Button.js';
import RateAndReviewService from '../../Services/rateAndReviewService.js';
import filmcardT from './FilmCard.handlebars';
import Bus from '../../modules/EventBus.js';

export default class FilmCard {
  constructor(context = {}) {
    const {
      parent, body, isAuthorized, actors,
    } = context;
    this.card = document.createElement('div');
    this.parent = parent;
    this.body = body;
    this.isAuthorized = isAuthorized;
    this.actors = actors;
    this.voteButton = new Button({
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
    this.card.innerHTML = this.template({
      isAuth: this.isAuthorized,
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
      stars: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      Button: this.voteButton.template({
        classname: 'buttons__marginForFilmCard',
        text: 'Оценить',
        id: 'vote',
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
