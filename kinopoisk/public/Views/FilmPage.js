import Base from './Base.js';
import FilmCard from '../components/FilmCard/FilmCard.js';

export default class FilmPage extends Base {
    #parent
    #body

    constructor(context = {}) {
      super(nav);
      const { parent, body } = context
      this.#parent = parent;
      this.#body = body
    }

    render() {
        super.render(false);
      const body = document.getElementById('body');
      let responseBody = JSON.parse(this.#body);
      body.style.cssText = `background-image: url(${responseBody.BigImg});`
      this.#parent.innerHTML = '';
      this.#parent.className = '';
      const film = new FilmCard({
          parent: this.#parent,
          body: responseBody
      });
      film.render();
    }
}
