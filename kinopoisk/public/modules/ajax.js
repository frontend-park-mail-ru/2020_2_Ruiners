(function() {
    const noop = () => {};

    class AjaxModule {
        ajaxGet = (ajaxArgs) => {
            this.#ajax({method: 'GET', ...ajaxArgs});
        }

        ajaxPost = (ajaxArgs) => {
            this.#ajax({method: 'POST', ...ajaxArgs});
        }

        #ajax({
                  method = 'GET',
                  url = '/',
                  body = null,
                  callback = noop
              } = {}) {
            const xhr = new XMLHttpRequest();
            const domain = 'http://95.163.208.72:8080'
            xhr.open(method, domain + url, true);
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function() {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;

                callback(xhr.status, xhr.responseText);
            });

            if (body) {
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
                xhr.send(JSON.stringify(body));
                return;
            }

            xhr.send();
        }
    }

    globalThis.AjaxModule = new AjaxModule();
})()