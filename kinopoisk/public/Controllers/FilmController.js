import Bus from "../modules/EventBus.js";
import personService from "../Services/personService.js";
import filmService from "../Services/filmService.js";
import sessionService from "../Services/sessionService.js";
import FilmPage from "../Views/FilmPage.js";
import {application} from "../config.js";

export default function Film(params) {
    const { id } = params;
    let responseBody;
    let isAuthorized = false;
    Bus.on('GetPersons', (context) => {
        const { responseBody, call } = context
        personService.getByFilmId(responseBody.id, 'actor').then((res) => {
            let actors;
            if (res.ok) {
                actors = res.get;
                call(actors);
            }
        });
    });
    Bus.on('PlaceComment', (context) => {
        const { responseBody, render, buttonComment } = context;
        const form = document.getElementById('msg');
        if (form.value === '') {
            const divError = buttonComment.parentElement;
            const err = document.createElement('div');
            err.textContent = 'Пустой отзыв';
            err.className = 'error';
            divError.appendChild(err);
        } else {
            filmService.PostReview(responseBody.id, form.value).then((res) => {
                render();
            });
        }
    });
    Bus.on('GetComments', (context) => {
        const { call, responseBody } = context;
        filmService.getByReviews(responseBody.id).then((res) => {
            let comments = res.get;
            call(comments);
        });
    })
    sessionService.me()
        .then((res) => {
            console.log(res);
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
                        const film = new FilmPage({ parent: application, body: responseBody, isAuthorized });
                        film.render();
                    } else {
                        this.menuPage();
                    }
                });
        });
}