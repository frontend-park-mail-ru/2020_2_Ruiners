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

  render(playlists) {
    super.render(false);
    const body = document.getElementById('body');
    body.className = 'main__background';
    const responseBody = JSON.parse(this.body);
    body.style.backgroundImage = `linear-gradient(to top, rgba(46, 46, 46, 1) 0%, rgba(46, 46, 46, 0.8) 20%, rgba(46, 46, 46, 0.6) 40%, rgba(46, 46, 46, 0.4) 60%, rgba(46, 46, 46, 0.2) 80%, rgba(46, 46, 46, 0) 100%), url(${responseBody.BigImg})`;
    this.parent.innerHTML = '';
    this.parent.className = '';
    Bus.emit('GetPersons', {
      responseBody: responseBody,
      call: (actors) => {
          responseBody.MyRateBool = false;
          responseBody.MyRate = 4;
          if(responseBody.MyRate > 0) {
            responseBody.MyRateBool = true
          }
          const film = new FilmCard({
            isAuthorized: this.isAuthorized,
            parent: this.parent,
            playlists: playlists,
            body: responseBody,
            actors,
          });
          film.render();
          if(playlists.length !== 0) {
              const addPlaylist = document.getElementById('adding');
              const info = addPlaylist.parentNode;
              let success = document.createElement('span');
              let error = document.createElement('span');
              info.appendChild(success);
              info.appendChild(error);
              addPlaylist.addEventListener('click', (evt) => {
                  evt.preventDefault();
                  const options = document.getElementsByTagName('option')
                  const optionsList = Array.prototype.slice.call(options);
                  optionsList.forEach((element) => {
                      if (element.selected) {
                          Bus.emit('addPlaylist', {
                              playlistId: parseInt(element.id),
                              filmId: responseBody.id,
                              error: error,
                              success: success,
                          });
                      }
                  });
              });
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
                  playlists: playlists,
                  buttonComment: buttonComment,
                })
              });
            }

          }
        }))
      }
    })


  }
}
