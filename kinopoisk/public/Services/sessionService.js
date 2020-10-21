import { AjaxModule } from '../modules/ajax1.js';

export default class SessionService {
  static async fetchLogin(login, password) {
    const res = await AjaxModule.ajaxPost({ url: '/login', body: { login, password } });
    //console.log(res);
    return res.status;
  }

  static async fetchSignup(login, email, password) {
    const res = await AjaxModule.ajaxPost({ url: '/signup', body: { login, email, password } });
    //console.log(res);
    return res.status;
  }

  static async login(login, password) {
    if (login === '') {
      return { ok: false, errmsg: 'Пустой логин' };
    }
    if (password === '') {
      return { ok: false, errmsg: 'Пустой пароль' };
    }
    const res = await this.fetchLogin(login, password);
    if (res !== 200) {
      return { ok: false, errmsg: 'bad request' };
    }
    return { ok: true, errmsg: undefined };
  }

  static async signup(login, email, password) {
    if (login === '') {
      return { ok: false, errmsg: 'Пустой логин' };
    }
    if (email === '') {
      return { ok: false, errmsg: 'Пустой пароль' };
    }
    if (password === '') {
      return { ok: false, errmsg: 'Пустой пароль' };
    }
    const res = await this.fetchSignup(login, email, password);
    if (res !== 200) {
      return { ok: false, errmsg: 'Пользователь с таким логином уже существует'};
    }
    return { ok: true, errmsg: undefined };
  }
}
