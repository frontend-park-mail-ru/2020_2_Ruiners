import { AjaxModule } from '../modules/ajax1.js';

export default class SessionService {
  static async fetchLogin(login, password) {
    const res = await AjaxModule.ajaxPost({ url: '/login', body: { login, password } });
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
    console.log(login, password);
    const res = await this.fetchLogin(login, password);
    if (res !== 200) {
      return { ok: false, errmsg: 'bad request' };
    }
    return { ok: true, errmsg: undefined };
  }
}
