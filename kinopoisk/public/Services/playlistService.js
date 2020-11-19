import { AjaxModule } from '../modules/ajax.js';

export default class PlaylistService {
    static async fetchGetPlaylistFilms() {
        const res = await AjaxModule.ajaxGet({ url: `/playlist/show` });
        const parsedJsonObject = await res.json();
        return { status: res.status, json: parsedJsonObject };
    }

    static async fetchGetPlaylists() {
        const res = await AjaxModule.ajaxGet({ url: `/playlist/list` });
        const parsedJsonObject = await res.json();
        return { status: res.status, json: parsedJsonObject };
    }

    static async fetchPostCreate(body) {
        const res = await AjaxModule.ajaxPost({ url: '/playlist/create', body: { body } });
        return res.status;
    }

    static async fetchPostAdd(filmId, playlistId) {
        const res = await AjaxModule.ajaxPost({ url: '/playlist/add', body: { filmId, playlistId } });
        return res.status;
    }

    static async fetchPostDelete(playlistId) {
        const res = await AjaxModule.ajaxPost({ url: '/playlist/delete', body: { playlistId } });
        return res.status;
    }

    static async fetchPostDeleteFilm(filmId, playlistId) {
        const res = await AjaxModule.ajaxPost({ url: '/playlist/deletefilm', body: { filmId, playlistId } });
        return res.status;
    }

    static async getPlaylistFilms() {
        const data = { ok: false, errmsg: undefined, get: undefined };
        const res = await this.fetchGetPlaylistFilms();
        if (res.status !== 200) {
            data.errmsg = 'Нет плэйлистов';
        } else {
            data.ok = true;
            data.get = res.json;
        }
        return data;
    }

    static async getPlaylists() {
        const data = { ok: false, errmsg: undefined, get: undefined };
        const res = await this.fetchGetPlaylists();
        if (res.status !== 200) {
            data.errmsg = 'Нет плэйлистов';
        } else {
            data.ok = true;
            data.get = res.json;
        }
        return data;
    }

    static async PostCreate(body) {
        const data = { ok: false, errmsg: undefined };
        if (body === '') {
            data.errmsg = 'Пустое поле';
        }
        const res = await this.fetchPostCreate(body);
        if (res !== 200) {
            data.errmsg = 'Ошибка';
        } else {
            data.ok = true;
        }
        return data;
    }

    static async PostAdd(filmId, playlistId) {
        const data = { ok: false, errmsg: undefined };
        const res = await this.fetchPostAdd(filmId, playlistId);
        if (res !== 200) {
            data.errmsg = 'Ошибка';
        } else {
            data.ok = true;
        }
        return data;
    }

    static async PostDelete(playlistId) {
        const data = { ok: false, errmsg: undefined };
        const res = await this.fetchPostDelete(playlistId);
        if (res !== 200) {
            data.errmsg = 'Ошибка';
        } else {
            data.ok = true;
        }
        return data;
    }

    static async PostDeleteFilm(filmId, playlistId) {
        const data = { ok: false, errmsg: undefined };
        const res = await this.fetchPostDeleteFilm(filmId, playlistId);
        if (res !== 200) {
            data.errmsg = 'Ошибка';
        } else {
            data.ok = true;
        }
        return data;
    }
}
