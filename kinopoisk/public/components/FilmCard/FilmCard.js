import Button from "../Button/Button.js";

export default class FilmCard {
    card;
    #parent;
    template;
    voteButton;

    constructor(context = {}) {
        const { parent } = context;
        this.card = document.createElement('div');
        this.#parent = parent;
        this.voteButton = new Button( {
            classname: 'buttons buttons__marginForFilmCard',
            parent: null
        });
        this.template = Handlebars.templates['FilmCard'];
    }

    render() {
        this.#parent.appendChild(this.card);
        this.card.innerHTML = this.template({
            title: "Начало",
            description: "Шпионаж фантастического уровня. С помощью сверхтехнологии " +
                "герой Ди Каприо и его команда проникают в чужие сны",
            youtube: "https://www.youtube.com/embed/85Zz1CCXyDI",
            genres: [
                "Фантастика",
                "Триллер",
                "Боевик",
                "Детектив",
                "Драма"
            ],
            actors: [
                "Леонардо ДиКаприо",
                "Джозеф Гордон-Левитт",
                "Эллен Пейдж",
                "Том Харди",
                "Кэн Ватанабэ",
            ],
            countries: [
                "США",
                "Великобритания"
            ],
            rate: 0,
            votes: 0,
            Button: this.voteButton.template( {
                classname: 'buttons buttons__marginForFilmCard',
                text: 'Оценить'
            })
        });
    }
}