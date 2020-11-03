import Button from '../Button/Button.js';
import RateAndReviewService from '../../Services/rateAndReviewService.js';

export default class FilmCard {
    card;

    #parent;

    #body;

    #isAuthorized;

    template;

    voteButton;

    constructor(context = {}) {
      const { parent, body, isAuthorized } = context;
      this.card = document.createElement('div');
      this.#parent = parent;
      this.#body = body;
      this.#isAuthorized = isAuthorized;
      this.voteButton = new Button({
        classname: 'buttons buttons__forComments',
        parent: null,
      });
      this.template = Handlebars.templates.FilmCard;
    }

    render() {
      this.#parent.appendChild(this.card);
      this.card.innerHTML = this.template({
        isAuth: this.#isAuthorized,
        title: this.#body.title,
        description: this.#body.Description,
        youtube: this.#body.YoutubeLink,
        genres: [
          this.#body.MainGenre,
        ],
        actors: [
          'Леонардо ДиКаприо',
          'Джозеф Гордон-Левитт',
          'Эллен Пейдж',
          'Том Харди',
          'Кэн Ватанабэ',
        ],
        countries: [
          this.#body.country
        ],
        rate: this.#body.Rating,
        votes: this.#body.SumVotes,
        stars: [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
        Button: this.voteButton.template({
          classname: 'buttons buttons__marginForFilmCard',
          text: 'Оценить',
          id: 'vote',
          type: 'submit',
        }),
      });
      const button = document.getElementById('vote');
      const err = document.createElement('div');
      err.className = 'success succes__marginForFilmCard';
      if(this.#isAuthorized) {
          button.addEventListener('click', (event) => {
              for (let i = 1; i <= 10; i++) {
                  let star = document.getElementById(`star-${i}`)
                  if (star.checked) {
                      RateAndReviewService.Rate(this.#body.id, i)
                          .then((res) => {
                              if (res.ok) {
                                  err.textContent = 'Вы успешно проголосовали!';
                                  this.card.appendChild(err);
                              }
                          })
                  }
              }
          })
      }
    }
}
