import { AjaxModule } from '../modules/ajax.js';

export default class SubscribeService {
  static async fetchGetFollowers() {
    const res = await AjaxModule.ajaxGet({ url: '/api/authors' });
    const parsedJsonObject = await res.json();
    return { status: res.status, json: parsedJsonObject };
  }

  static async fetchGetLogin(id) {
    const res = await AjaxModule.ajaxGet({ url: `/api/people/${id}` });
    const parsedJsonObject = await res.json();
    return { status: res.status, json: parsedJsonObject };
  }

  static async fetchGetNews() {
    const res = await AjaxModule.ajaxGet({ url: '/api/news' });
    const parsedJsonObject = await res.json();
    return { status: res.status, json: parsedJsonObject };
  }

  static async fetchGetCheck(id) {
    const res = await AjaxModule.ajaxGet({ url: `/api/sub/check/${id}` });
    let parsedJsonObject;
    try {
      parsedJsonObject = await res.json();
    } catch (e) {
      return { status: res.status, json: {} };
    }
    return { status: res.status, json: parsedJsonObject };
  }

  static async fetchPostFollow(user_id) {
    const res = await AjaxModule.ajaxPost({ url: '/api/follow', body: { user_id } });
    return res.status;
  }

  static async fetchPostUnfollow(user_id) {
    const res = await AjaxModule.ajaxPost({ url: '/api/unfollow', body: { user_id } });
    return res.status;
  }

  static async getFollowers() {
    const data = { ok: false, errmsg: undefined, get: undefined };
    const res = await this.fetchGetFollowers();
    if (res.status !== 200) {
      data.errmsg = 'Нет подписок';
    } else {
      data.ok = true;
      data.get = res.json;
    }
    return data;
  }

  static async getNews() {
    const data = { ok: false, errmsg: undefined, get: undefined };
    const res = await this.fetchGetNews();
    if (res.status !== 200) {
      data.errmsg = 'Нет новостей';
    } else {
      data.ok = true;
      data.get = res.json;
    }
    return data;
  }

  static async getLogin(id) {
    const data = { ok: false, errmsg: undefined, get: undefined };
    const res = await this.fetchGetLogin(id);
    if (res.status !== 200) {
      data.errmsg = 'Нет логина';
    } else {
      data.ok = true;
      data.get = res.json;
    }
    return data;
  }

  static async PostFollow(id) {
    const data = { ok: false, errmsg: undefined };
    const res = await this.fetchPostFollow(parseInt(id));
    if (res !== 200) {
      data.errmsg = 'Ошибка';
    } else {
      data.ok = true;
    }
    return data;
  }

  static async PostUnfollow(id) {
    const data = { ok: false, errmsg: undefined };
    const res = await this.fetchPostUnfollow(parseInt(id));
    if (res !== 200) {
      data.errmsg = 'Ошибка';
    } else {
      data.ok = true;
    }
    return data;
  }

  static async getCheck(id) {
    const data = { ok: false, errmsg: undefined, get: undefined };
    const res = await this.fetchGetCheck(id);
    if (res.status !== 200) {
      data.errmsg = 'Нет';
    } else {
      data.ok = true;
      data.get = res.json;
    }
    return data;
  }
}
