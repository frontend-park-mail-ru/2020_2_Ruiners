export default class FilmPoster {
    poster;

    template;

    #title;

    #genre;

    #year;

    #image;

    #id;

    constructor(context = {}) {
      const {
        title, genre, year, image, id
      } = context;
      this.#title = title;
      this.#genre = genre;
      this.#image = image;
      this.#year = year;
      this.#id = id;
      this.poster = document.createElement('div');
      this.template = Handlebars.templates.FilmPoster;
    }

    render() {
      return this.template({
        id: this.#id,
        title: this.#title,
        genre: this.#genre,
        year: this.#year,
        image: this.#image,
      });
    }
}
