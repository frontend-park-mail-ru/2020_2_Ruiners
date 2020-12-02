import { AjaxModule } from '../modules/ajax.js';

export default class FilmService {
  static async fetchGetById(id) {
    const res = await AjaxModule.ajaxGet({ url: `/film/${id}` });
    const parsedJsonObject = await res.json();
    return { status: res.status, json: parsedJsonObject };
  }

  static async fetchGetRate(film_id) {
    const res = await AjaxModule.ajaxGet({ url: `/currentRating/${film_id}` });
    let parsedJsonObject;
    try {
      parsedJsonObject = await res.json();
    } catch (e) {
      return { status: res.status, json: {} };
    }
    return { status: res.status, json: parsedJsonObject };
  }

  static async fetchGetByGenre(genre) {
    const res = await AjaxModule.ajaxGet({ url: `/film/${genre}` });
    const parsedJsonObject = await res.json();
    return { status: res.status, json: parsedJsonObject };
  }

  static async fetchGetByPerson(id) {
    const res = await AjaxModule.ajaxGet({ url: `/person_film/${id}` });
    const parsedJsonObject = await res.json();
    return { status: res.status, json: parsedJsonObject };
  }

  static async fetchPostReview(film_id, body) {
    const res = await AjaxModule.ajaxPost({ url: '/review/add', body: { film_id, body } });
    return res.status;
  }

  static async fetchGetByReviews(filmId) {
    const res = await AjaxModule.ajaxGet({ url: `/review/${filmId}` });
    const parsedJsonObject = await res.json();
    return { status: res.status, json: parsedJsonObject };
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

  static async getRate(id) {
    const data = { ok: false, errmsg: undefined, get: undefined };
    const res = await this.fetchGetRate(id);
    if (res.status !== 200) {
      data.errmsg = 'Нет такой оценки';
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
      data.errmsg = 'Нет фильмов с таким жанром';
    } else {
      data.ok = true;
      data.get = res.json;
    }
    return data;
  }

  static async getByPerson(id) {
    const data = { ok: false, errmsg: undefined, get: undefined };
    const res = await this.fetchGetByPerson(id);
    if (res.status !== 200) {
      data.errmsg = 'Нет фильмов с таким актером';
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
      data.errmsg = 'Ошибка';
    } else {
      data.ok = true;
    }
    return data;
  }

  static async getByReviews(filmId) {
    const data = { ok: false, errmsg: undefined, get: undefined };
    const res = await this.fetchGetByReviews(filmId);
    if (res.status !== 200) {
      data.errmsg = 'Нет комментариев у фильма';
    } else {
      data.ok = true;
      data.get = res.json;
    }
    return data;
  }
}
