import { AjaxModule } from '../modules/ajax.js';

export default class SessionService {
  static async fetchLogin(login, password) {
    const res = await AjaxModule.ajaxPost({ url: '/login', body: { login, password } });
    // console.log(res);
    return res.status;
  }

  static async fetchSignup(login, email, password) {
    const res = await AjaxModule.ajaxPost({ url: '/signup', body: { login, email, password } });
    // console.log(res);
    return res.status;
  }

  static async fetchLogout() {
    const res = await AjaxModule.ajaxGet({ url: '/logout' });
    return res.status;
  }

  static async fetchMe() {
    const res = await AjaxModule.ajaxGet({ url: '/me' });
    const parsedJsonObject = await res.json();
    return { status: res.status, json: parsedJsonObject };
  }

  static async login(login, password) {
    const data = { ok: false, errmsg: undefined };
    if (login === '') {
      data.errmsg = 'Пустой логин';
    }
    if (password === '') {
      data.errmsg = 'Пустой пароль';
    }
    const res = await this.fetchLogin(login, password);
    if (res !== 200) {
      data.errmsg = 'Неправильное имя пользователя или пароль';
    } else {
      data.ok = true;
    }
    return data;
  }

  static async signup(login, email, password) {
    const data = { ok: false, errmsg: undefined };
    if (login === '') {
      data.errmsg = 'Пустой логин';
    }
    if (email === '') {
      data.errmsg = 'Пустой email';
    }
    if (password === '') {
      data.errmsg = 'Пустой пароль';
    }
    const res = await this.fetchSignup(login, email, password);
    if (res !== 200) {
      data.errmsg = 'Пользователь с таким логином уже существует';
    } else {
      data.ok = true;
    }
    return data;
  }

  static async logout() {
    const data = { ok: false, errmsg: undefined };
    const res = await this.fetchLogout();
    if (res !== 200) {
      data.errmsg = 'bad request';
    } else {
      data.ok = true;
    }
    return data;
  }

  static async me() {
    const data = { ok: false, errmsg: undefined, get: undefined };
    const res = await this.fetchMe();
    if (res.status !== 200) {
      data.errmsg = 'bad request';
    } else {
      data.ok = true;
      data.get = res.json;
    }
    return data;
  }
}
