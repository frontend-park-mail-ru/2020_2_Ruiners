import Base from './Base.js';
import FilmCard from '../Components/FilmCard/FilmCard.js';
import Comments from '../Components/Comments/Comments.js';
import Bus from '../modules/EventBus.js';
import personService from '../Services/personService.js';
import { nav, domain } from '../config.js';
import filmService from '../Services/filmService';
import FilmLenta from '../Components/FilmLenta/FilmLenta';
import styles from '../static/CSS/main.scss';

export default class FilmPage extends Base {
  constructor(context = {}) {
    super(nav);
    const { parent, body, isAuthorized } = context;
    this.parent = parent;
    this.body = body;
    this.isAuthorized = isAuthorized;
  }

  render(playlists, similar) {
    super.render(false);
    const body = document.getElementById('body');
    body.className = styles.main__background;
    const responseBody = JSON.parse(this.body);
    body.style.backgroundImage = `linear-gradient(to top, rgba(46, 46, 46, 1) 0%, rgba(46, 46, 46, 0.8) 20%, rgba(46, 46, 46, 0.6) 40%, rgba(46, 46, 46, 0.4) 60%, rgba(46, 46, 46, 0.2) 80%, rgba(46, 46, 46, 0) 100%), url(${responseBody.big_img})`;
    this.parent.innerHTML = '';
    this.parent.className = '';
    Bus.emit('GetPersons', {
      responseBody,
      call: (actors) => {
        filmService.getRate(responseBody.id).then((res) => {
          responseBody.MyRateBool = false;
          if (res.ok) {
            responseBody.MyRate = res.get.rate;
          } else {
            responseBody.MyRate = 0;
          }
          if (responseBody.MyRate > 0) {
            responseBody.MyRateBool = true;
          }
          const film = new FilmCard({
            isAuthorized: this.isAuthorized,
            parent: this.parent,
            playlists,
            body: responseBody,
            actors,
          });
          film.render();
          const lenta = new FilmLenta({
            parent: this.parent,
            genre: 'Похожие',
            body: similar,
          });
          lenta.render();
          if (playlists.length !== 0) {
            const addPlaylist = document.getElementById('adding');
            const info = addPlaylist.parentNode;
            const success = document.createElement('span');
            const error = document.createElement('span');
            info.appendChild(success);
            info.appendChild(error);
            addPlaylist.addEventListener('click', (evt) => {
              evt.preventDefault();
              const options = document.getElementsByTagName('option');
              const optionsList = Array.prototype.slice.call(options);
              optionsList.forEach((element) => {
                if (element.selected) {
                  Bus.emit('addPlaylist', {
                    playlistId: parseInt(element.id),
                    filmId: responseBody.id,
                    error,
                    success,
                  });
                }
              });
            });
          }
          Bus.emit('GetComments', ({
            responseBody,
            call: (comments) => {
              for (let i = 0; i < comments.length; i++) {
                comments[i].image = `${domain}/api/user/avatar/${`${comments[i].user_id}?${Math.random()}`}`;
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
                    responseBody,
                    render: this.render.bind(this),
                    playlists,
                    similar: similar,
                    buttonComment,
                  });
                });
              }
            },
          }));
        });
      },
    });
  }
}
