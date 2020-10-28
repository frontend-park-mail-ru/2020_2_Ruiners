import Button from '../Button/Button.js';

export default class FilmCard {
    card;

    #parent;

    #body;

    template;

    voteButton;

    constructor(context = {}) {
      const { parent, body } = context;
      this.card = document.createElement('div');
      this.#parent = parent;
      this.#body = body;
      this.voteButton = new Button({
        classname: 'buttons buttons__marginForFilmCard',
        parent: null,
      });
      this.template = Handlebars.templates.FilmCard;
    }

    render() {
      this.#parent.appendChild(this.card);
      this.card.innerHTML = this.template({
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
        rate: 0,
        votes: 0,
        Button: this.voteButton.template({
          classname: 'buttons buttons__marginForFilmCard',
          text: 'Оценить',
        }),
      });
    }
}
