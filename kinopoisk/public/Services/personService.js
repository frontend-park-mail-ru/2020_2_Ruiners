import { AjaxModule } from '../modules/ajax.js';

export default class PersonService {
  static async fetchGetById(id) {
    const res = await AjaxModule.ajaxGet({ url: `/person/${id}` });
    const parsedJsonObject = await res.json();
    return { status: res.status, json: parsedJsonObject };
  }

  static async fetchGetByFilmId(id, role) {
    const res = await AjaxModule.ajaxGet({ url: `/${role}/${id}` });
    const parsedJsonObject = await res.json();
    return { status: res.status, json: parsedJsonObject };
  }

  static async getById(id) {
    const data = { ok: false, errmsg: undefined, get: undefined };
    const res = await this.fetchGetById(id);
    if (res.status !== 200) {
      data.errmsg = 'Нет такого актера';
    } else {
      data.ok = true;
      data.get = res.json;
    }
    return data;
  }

  static async getByFilmId(id, role) {
    const data = { ok: false, errmsg: undefined, get: undefined };
    const res = await this.fetchGetByFilmId(id, role);
    if (res.status !== 200) {
      data.errmsg = 'Ошибка';
    } else {
      data.ok = true;
      data.get = res.json;
    }
    return data;
  }
}
