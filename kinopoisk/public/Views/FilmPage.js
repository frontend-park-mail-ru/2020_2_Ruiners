import Base from './Base.js';
import FilmCard from '../components/FilmCard/FilmCard.js';
import Comments from "../components/Comments/Comments.js";
import filmService from "../Services/filmService.js";
import sessionService from "../Services/sessionService.js";
import Bus from "../Services/EventBus.js";
import personService from "../Services/personService.js";

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
      personService.getByFilmId(responseBody.id, 'actor').then(res => {
          let actors;
          if(res.ok) {
              try {
                  actors = JSON.parse(JSON.stringify(res.get));
              } catch (e) {
                  Bus.emit('main');
              }
              const film = new FilmCard({
                  isAuthorized: this.#isAuthorized,
                  parent: this.#parent,
                  body: responseBody,
                  actors: actors,
              });
              film.render();
          }

      })
      filmService.getByReviews(responseBody.id).then( res => {
          let comments;
          try {
              comments = JSON.parse(JSON.stringify(res.get));
          } catch (e) {
              Bus.emit('main');
          }
          let ids = []
          for(let i = 0; i < comments.length; i++) {
              ids.push(comments[i].UserId);
          }
          sessionService.getAvatars(ids).then(images => {
              for(let i = 0; i < images.get.length; i++) {
                  const outside = URL.createObjectURL(images.get[i])
                  comments[i].Image = outside
              }
              const commentsObj = new Comments({
                  isAuthorized: this.#isAuthorized,
                  parent: this.#parent,
                  body: comments
              })
              commentsObj.render();
              if (this.#isAuthorized) {
                  const buttonComment = document.getElementById('msg_button');
                  buttonComment.addEventListener('click', (event) => {
                      const form = document.getElementById('msg');
                      if(form.value == '') {
                          const divError = buttonComment.parentElement;
                          const err = document.createElement('div');
                          err.textContent = 'Пустой отзыв';
                          err.className = 'error';
                          divError.appendChild(err);
                      } else {
                          filmService.PostReview(responseBody.id, form.value).then(res => {
                              this.render();
                          });
                      }
                  })
              }
          });
      });
    }
}
