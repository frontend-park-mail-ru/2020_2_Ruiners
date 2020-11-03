import Base from './Base.js';
import FilmCard from '../components/FilmCard/FilmCard.js';
import Comments from "../components/Comments/Comments.js";
import filmService from "../Services/filmService.js";

export default class FilmPage extends Base {
    #parent
    #body
    #isAuthorized

    constructor(context = {}) {
      super(nav);
      const { parent, body, isAuthorized } = context
      this.#parent = parent;
      this.#body = body
      this.#isAuthorized = isAuthorized;
      console.log("isAuth = ", this.#isAuthorized);
    }

    render() {
      super.render(false);
      const body = document.getElementById('body');
      body.className = 'film1';
      let responseBody = JSON.parse(this.#body);
      body.style.backgroundImage =`linear-gradient(to top, #2e2e2e 0%, rgba(0,0,0,0.1) 40%), url(${responseBody.BigImg})`
      this.#parent.innerHTML = '';
      this.#parent.className = '';
      const film = new FilmCard({
          isAuthorized: this.#isAuthorized,
          parent: this.#parent,
          body: responseBody
      });
      film.render();
      filmService.getByReviews(responseBody.id).then( res => {
          const comments = JSON.parse(JSON.stringify(res.get));
          const commentsObj = new Comments({
              isAuthorized: this.#isAuthorized,
              parent: this.#parent,
              body: comments
          })
          commentsObj.render();
          if(this.#isAuthorized) {
              const buttonComment = document.getElementById('msg_button');
              buttonComment.addEventListener('click', (event) => {
                  const form = document.getElementById('msg');
                  filmService.PostReview(responseBody.id, form.value).then(res => {
                      this.render();
                  });
              })
          }
      });
    }
}
