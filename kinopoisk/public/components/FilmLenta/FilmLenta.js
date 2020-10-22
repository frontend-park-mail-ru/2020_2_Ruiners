import FilmPoster from "../FilmPoster/FilmPoster.js";

export default class FilmLenta {
    lenta;
    template;
    #parent;
    #genre;
    #posters;

    constructor(context = {}) {
        const { genre, parent } = context;
        this.#genre = genre;
        this.#parent = parent;
        this.lenta = document.createElement('div');
        this.template = Handlebars.templates['FilmLenta'];
        let posters = [];
        if (this.#genre === 'Триллеры') {
            for( let i = 0; i < 5; i++) {
                const poster = new FilmPoster({
                    title: 'Начало',
                    genre: 'Триллер',
                    year: 2010,
                    image: 'static/images/nachalo.jpg'
                });
            }
            posters[i] = poster.render();
        }
        if (this.#genre === 'Комедии') {
            for( let i = 0; i < 5; i++) {
                const poster = new FilmPoster({
                    title: 'Мачо и ботан',
                    genre: 'Комедия',
                    year: 2012,
                    image: 'static/images/Macho.jpg'
                });
                posters[i] = poster.render();
            }
        }
        if (this.#genre === 'Ужастики') {
            for( let i = 0; i < 5; i++) {
                const poster = new FilmPoster({
                    title: 'Человек-неидимка',
                    genre: 'Ужастик',
                    year: 2020,
                    image: 'static/images/nevidimka.jpg'
                });
                posters[i] = poster.render();
            }
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