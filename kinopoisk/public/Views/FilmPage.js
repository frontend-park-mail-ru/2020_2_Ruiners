import Base from './Base.js';
import FilmCard from '../Components/FilmCard/FilmCard.js';
import Comments from "../Components/Comments/Comments.js";
import filmService from "../Services/filmService.js";
import Bus from "../Services/EventBus.js";
import personService from "../Services/personService.js";

export default class FilmPage extends Base {
    constructor(context = {}) {
      super(nav);
      const { parent, body, isAuthorized } = context
      this.parent = parent;
      this.body = body
      this.isAuthorized = isAuthorized;
      console.log("isAuth = ", this.isAuthorized);
    }

    render() {
      super.render(false);
      const body = document.getElementById('body');
      body.className = 'film1';
      let responseBody = JSON.parse(this.body);
      body.style.backgroundImage =`linear-gradient(to top, #2e2e2e 0%, rgba(0,0,0,0.1) 40%), url(${responseBody.BigImg})`
      this.parent.innerHTML = '';
      this.parent.className = '';
      personService.getByFilmId(responseBody.id, 'actor').then(res => {
          let actors;
          if(res.ok) {
              try {
                  actors = JSON.parse(JSON.stringify(res.get));
              } catch (e) {
                  Bus.emit('main');
              }
              const film = new FilmCard({
                  isAuthorized: this.isAuthorized,
                  parent: this.parent,
                  body: responseBody,
                  actors: actors,
              });
              film.render();
          }
          filmService.getByReviews(responseBody.id).then( res => {
              let comments;
              try {
                  comments = JSON.parse(JSON.stringify(res.get));
              } catch (e) {
                  Bus.emit('main');
              }
              for(let i = 0; i < comments.length; i++) {
                  comments[i].Image = `${domain}/user/avatar/${comments[i].UserId + '?' + Math.random()}`
              }
              const commentsObj = new Comments({
                  isAuthorized: this.isAuthorized,
                  parent: this.parent,
                  body: comments
              })
              commentsObj.render();
              if (this.isAuthorized) {
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
