import { AjaxModule } from '../modules/ajax1.js';

export default class UserService {
  static async fetchChangeLogin(login) {
    const res = await AjaxModule.ajaxPost({ url: '/chengelogin', body: { login } });
    return res.status;
  }

  static async fetchChangePassword(PasswordOld, Password) {
    console.log({ PasswordOld, Password });
    const res = await AjaxModule.ajaxPost({ url: '/chengepass', body: { PasswordOld, Password } });
    // console.log(res);
    return res.status;
  }

  static async ChangeLogin(login) {
    const data = { ok: false, errmsg: undefined };
    if (login === '') {
      data.errmsg = 'Пустой логин';
    }
    const res = await this.fetchChangeLogin(login);
    if (res !== 200) {
      data.errmsg = 'bad request';
    } else {
      data.ok = true;
    }
    return data;
  }

  static async ChangePassword(oldPass, newPass) {
    const data = { ok: false, errmsg: undefined };
    if (oldPass === '') {
      data.errmsg = 'Пустой старый пароль';
    }
    if (newPass === '') {
      data.errmsg = 'Пустой новый пароль';
    }
    const res = await this.fetchChangePassword(oldPass, newPass);
    if (res !== 200) {
      data.errmsg = 'bad request';
    } else {
      data.ok = true;
    }
    return data;
  }
}
