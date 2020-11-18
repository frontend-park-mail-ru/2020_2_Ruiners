import Base from './Base.js';
import FilmCard from '../Components/FilmCard/FilmCard.js';
import Comments from '../Components/Comments/Comments.js';
import Bus from '../modules/EventBus.js';
import personService from '../Services/personService.js';
import { nav, domain } from "../config.js";

export default class FilmPage extends Base {
  constructor(context = {}) {
    super(nav);
    const { parent, body, isAuthorized } = context;
    this.parent = parent;
    this.body = body;
    this.isAuthorized = isAuthorized;
  }

  render() {
    super.render(false);
    const body = document.getElementById('body');
    body.className = 'main__background';
    const responseBody = JSON.parse(this.body);
    body.style.backgroundImage = `linear-gradient(to top, rgba(46, 46, 46, 1) 0%, rgba(46, 46, 46, 0.8) 20%, rgba(46, 46, 46, 0.6) 40%, rgba(46, 46, 46, 0.4) 60%, rgba(46, 46, 46, 0.2) 80%, rgba(46, 46, 46, 0) 100%), url(${responseBody.BigImg})`;
    this.parent.innerHTML = '';
    this.parent.className = '';
    personService.getByFilmId(responseBody.id, 'actor').then((res) => {
      let actors;
      if (res.ok) {
        try {
          actors = res.get;
        } catch (e) {
          Bus.emit('redirectMain');
        }
        const film = new FilmCard({
          isAuthorized: this.isAuthorized,
          parent: this.parent,
          body: responseBody,
          actors,
        });
        film.render();
      }
      Bus.emit('GetComments', ({
        responseBody: responseBody,
        call: (comments) => {
          for (let i = 0; i < comments.length; i++) {
            comments[i].Image = `${domain}/user/avatar/${`${comments[i].UserId}?${Math.random()}`}`;
          }
          const commentsObj = new Comments({
            isAuthorized: this.isAuthorized,
            parent: this.parent,
            body: comments,
          });
          commentsObj.render();
          if (this.isAuthorized) {
            const buttonComment = document.getElementById('msg_button');
            buttonComment.addEventListener('click', (event) => {
              Bus.emit('PlaceComment', {
                responseBody: responseBody,
                render: this.render.bind(this),
                buttonComment: buttonComment,
              })
            });
          }
        }
      }))
    });
  }
}
