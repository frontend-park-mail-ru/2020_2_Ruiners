(function() {
    const noop = () => {};
    const domain = 'http://95.163.208.72:8000';
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
            xhr.open(method, domain + url, true);
            xhr.crossOrigin = true
            xhr.withCredentials = true;

            xhr.addEventListener('readystatechange', function() {
                if (xhr.readyState !== XMLHttpRequest.DONE) return;

                callback(xhr.status, xhr.responseText);
            });

            if (body) {
                xhr.setRequestHeader('Content-type', 'application/json;charset=utf8');
                console.log(JSON.stringify(body));
                xhr.send(JSON.stringify(body));
                return;
            }

            xhr.send();
        }
    }

    globalThis.AjaxModule = new AjaxModule();
})()