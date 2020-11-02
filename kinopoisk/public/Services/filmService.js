import { AjaxModule } from '../modules/ajax1.js';

export default class FilmService {
    static async fetchGetById(id) {
        const res = await AjaxModule.ajaxGet({url: '/film/' + id});
        const parsedJsonObject = await res.json();
        return {status: res.status, json: parsedJsonObject};
    }

    static async fetchGetByGenre(genre) {
        const res = await AjaxModule.ajaxGet({url: '/film/' + genre});
        const parsedJsonObject = await res.json();
        return {status: res.status, json: parsedJsonObject};
    }

    static async fetchPostReview(filmId, body) {
        const res = await AjaxModule.ajaxPost({ url: '/review/add', body: { filmId, body } });
        // console.log(res);
        return res.status;
    }

    static async fetchGetByReviews(filmId) {
        const res = await AjaxModule.ajaxGet({url: '/film/' + filmId});
        const parsedJsonObject = await res.json();
        return {status: res.status, json: parsedJsonObject};
    }

    static async getById(id) {
        const data = { ok: false, errmsg: undefined, get: undefined };
        const res = await this.fetchGetById(id);
        if (res.status !== 200) {
            data.errmsg = 'Нет такого фильма';
        } else {
            data.ok = true;
            data.get = res.json;
        }
        return data;
    }

    static async getByGenre(genre) {
        const data = { ok: false, errmsg: undefined, get: undefined };
        const res = await this.fetchGetByGenre(genre);
        if (res.status !== 200) {
            data.errmsg = 'Пусто';
        } else {
            data.ok = true;
            data.get = res.json;
        }
        return data;
    }

    static async PostReview(filmId, body) {
        const data = { ok: false, errmsg: undefined };
        if (body === '') {
            data.errmsg = 'Пустое поле';
        }
        const res = await this.fetchPostReview(filmId, body);
        if (res !== 200) {
            data.errmsg = 'хз';
        } else {
            data.ok = true;
        }
        return data;
    }

    static async getByReviews(filmId) {
        const data = { ok: false, errmsg: undefined, get: undefined };
        const res = await this.fetchGetByReviews(filmId);
        if (res.status !== 200) {
            data.errmsg = 'Пусто';
        } else {
            data.ok = true;
            data.get = res.json;
        }
        return data;
    }
}
