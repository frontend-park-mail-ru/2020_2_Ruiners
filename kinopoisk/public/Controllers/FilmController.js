import Bus from '../modules/EventBus.js';
import personService from '../Services/personService.js';
import filmService from '../Services/filmService.js';
import sessionService from '../Services/sessionService.js';
import playlistService from '../Services/playlistService.js';
import FilmPage from '../Views/FilmPage.js';
import { application } from '../config.js';
import styles from '../static/CSS/main.scss';

export default function Film(params) {
  const { id } = params;
  let responseBody;
  let isAuthorized = false;
  Bus.on('GetPersons', (context) => {
    const { responseBody, call } = context;
    personService.getByFilmId(responseBody.id, 'actor').then((res) => {
      let actors;
      if (res.ok) {
        actors = res.get;
        call(actors);
      }
    });
  });
  Bus.on('PlaceComment', (context) => {
    const {
      responseBody, render, buttonComment, playlists, similar,
    } = context;
    const form = document.getElementById('msg');
    if (form.value === '') {
      const divError = buttonComment.parentElement;
      const err = document.createElement('div');
      err.textContent = 'Пустой отзыв';
      err.className = styles.error;
      divError.appendChild(err);
    } else {
      filmService.PostReview(responseBody.id, form.value).then((res) => {
        render(playlists, similar);
      });
    }
  });
  Bus.on('GetComments', (context) => {
    const { call, responseBody } = context;
    filmService.getByReviews(responseBody.id).then((res) => {
      const comments = res.get;
      call(comments);
    });
  });
  Bus.on('addPlaylist', (context) => {
    const {
      filmId, playlistId, error, success,
    } = context;
    playlistService.PostAdd(filmId, playlistId).then((res) => {
      if (res.ok) {
        success.textContent = 'Вы успешно добавили фильм в плэйлист';
        success.className = styles.success_add;
        error.innerHTML = '';
      } else {
        error.textContent = 'Вы уже добавили этот фильм в плэйлист';
        error.className = styles.error_add;
        success.innerHTML = '';
      }
    });
  });

  sessionService.me()
    .then((res) => {
      if (!res.ok) {
        isAuthorized = false;
      } else {
        isAuthorized = true;
      }
      filmService.getById(id)
        .then((res) => {
          try {
            responseBody = JSON.stringify(res.get);
          } catch (e) {
            this.menuPage();
            return;
          }
          if (res.ok) {
            let playlists = [];
            let similar = [];
            filmService.getByGenre('fantasy').then((simRes) => {
              if (simRes.ok) {
                similar = simRes.get;
                console.log(similar);
              }
              if (isAuthorized) {
                playlistService.getPlaylists().then((res) => {
                  if (res.ok) {
                    playlists = res.get;
                    const film = new FilmPage({ parent: application, body: responseBody, isAuthorized });
                    film.render(playlists, similar);
                  }
                });
              } else {
                const film = new FilmPage({ parent: application, body: responseBody, isAuthorized });
                film.render(playlists, similar);
              }
            });
          } else {
            this.menuPage();
          }
        });
    });
}
