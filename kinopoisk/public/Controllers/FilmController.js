import Bus from '../modules/EventBus.js';
import personService from '../Services/personService.js';
import filmService from '../Services/filmService.js';
import sessionService from '../Services/sessionService.js';
import playlistService from '../Services/playlistService.js';
import FilmPage from '../Views/FilmPage.js';
import { application } from '../config.js';
import styles from '../static/CSS/main.scss';
import Notes from '../Components/Notification/Notification';

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
      responseBody, call, buttonComment,
    } = context;
    const form = document.getElementById('msg');
    if (form.value === '') {
      const Note = new Notes({ body: 'Пустой отзыв!', parent: application, success: false });
      Note.render();
      const f = function () {
        Note.hide();
      };
      window.setTimeout(f, 2000);
    } else {
      filmService.PostReview(responseBody.id, form.value).then((res) => {
        filmService.getByReviews(responseBody.id).then((result) => {
          const comments = result.get;
          call(comments);
        });
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
  const success = new Notes({ body: 'Вы успешно добавили фильм в плэйлист', parent: application, success: true });
  const fail = new Notes({ body: 'Вы уже добавили этот фильм в плэйлист', parent: application, success: false });
  const fSuccess = function () {
    success.hide();
  };
  const fFail = function () {
    fail.hide();
  };
  Bus.on('addPlaylist', (context) => {
    const {
      filmId, playlistId,
    } = context;
    playlistService.PostAdd(filmId, playlistId).then((res) => {
      if (res.ok) {
        fail.hide();
        success.hide();
        success.render();
        window.setTimeout(fSuccess, 2000);
      } else {
        success.hide();
        fail.hide();
        fail.render();
        window.setTimeout(fFail, 2000);
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
            filmService.getSimilar(id).then((simRes) => {
              if (simRes.ok) {
                similar = simRes.get;
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
