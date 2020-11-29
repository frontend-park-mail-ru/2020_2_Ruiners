import { AjaxModule } from '../modules/ajax.js';

export default class UserService {
  static async fetchChangeLogin(login) {
    const res = await AjaxModule.ajaxPost({ url: '/chengelogin', body: { login } });
    return res.status;
  }

  static async fetchChangePassword(PasswordOld, Password) {
    const res = await AjaxModule.ajaxPost({ url: '/chengepass', body: { PasswordOld, Password } });
    return res.status;
  }

  static async fetchChangeAvatar(avatar) {
    const res = await AjaxModule.ajaxPost({ url: '/changeAvatar', body: avatar });
    return res.status;
  }

  static async ChangeLogin(login) {
    const data = { ok: false, errmsg: undefined };
    if (login === '') {
      data.errmsg = 'Пустой логин';
    }
    const res = await this.fetchChangeLogin(login);
    if (res !== 200) {
      data.errmsg = 'Пользователь с таким логином уже сущетсвует';
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
      data.errmsg = 'Неправильный старый пароль';
    } else {
      data.ok = true;
    }
    return data;
  }

  static async ChangeAvatar(avatar) {

  }

  static async Change(login, oldPass, newPass, avatar) {
    const data = { ok: false, errmsg: '' };
    let resLog = 200;
    let resPass = 200;
    let resAvatar = 200;
    if (login && login != '') {
      resLog = await this.fetchChangeLogin(login);
    }
    if (resLog === 200) {
      if (oldPass && newPass) {
        resPass = await this.fetchChangePassword(oldPass, newPass);
      }
    }
    if (resLog === 200 && resPass === 200) {
      if (avatar != {}) {
        resAvatar = await this.fetchChangeAvatar(avatar);
      }
    }
    if (resLog !== 200) {
      data.errmsg += '\nПользователь с таким логином уже существует';
    }
    if (resPass !== 200) {
      data.errmsg += '\nНеправильный старый пароль';
    }
    if (resLog === 200 && resPass === 200) {
      data.ok = true;
    }
    return data;
  }
}
