import { AjaxModule } from '../modules/ajax.js';

export default class RateAndReviewService {
  static async fetchRate(filmId, rating) {
    const res = await AjaxModule.ajaxPost({
      url: '/rate',
      body: {
        filmId,
        rating,
      },
    });
    return res.status;
  }

  static async Rate(filmId, rating) {
    const data = { ok: false, errmsg: undefined };
    const res = await this.fetchRate(filmId, rating);
    if (res !== 200) {
      data.errmsg = 'Ошибка оценки';
    } else {
      data.ok = true;
    }
    return data;
  }
}
