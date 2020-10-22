export default class FilmPoster {
    poster;
    template;
    #title;
    #genre;
    #year;
    #image;

    constructor(context = {}) {
        const { title, genre, year, image } = context;
        this.#title = title;
        this.#genre = genre;
        this.#image = image;
        this.#year = year;
        this.poster = document.createElement('div');
        this.template = Handlebars.templates['FilmPoster'];
    }

    render() {
        return this.template({
            title: this.#title,
            genre: this.#genre,
            year: this.#year,
            image: this.#image
        });
    }
}