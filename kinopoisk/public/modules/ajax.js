import { domain } from '../config.js'

export class AjaxModule {
  static ajaxGet(ajaxArgs) {
    return this.ajax({ method: 'GET', ...ajaxArgs });
  }

  static ajaxPost(ajaxArgs) {
    return this.ajax({ method: 'POST', ...ajaxArgs });
  }

  static ajax({
    method = 'GET',
    url = '/',
    body = null,
  } = {}) {
    const params = {
      method,
      credentials: 'include',
      mode: 'cors',
    };
    if (body) {
      if (body instanceof FormData) {
        params.body = body;
      } else {
        params.body = JSON.stringify(body);
        console.log(params.body);
        params.headers = {
          'Content-Type': 'application/json',
        };
      }
    }
    return fetch(domain + url, params);
  }
}
