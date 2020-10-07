(function() {
    const noop = () => {};
    const domain = 'http://localhost:8000';
    class AjaxModule {
        ajaxGet = (ajaxArgs) => {
            this.#ajax({method: 'GET', ...ajaxArgs});
        }

        ajaxPost = (ajaxArgs) => {
            this.#ajax({method: 'POST', ...ajaxArgs});
        }

        ajaxGetUsingFetch = async (ajaxArgs) => {
            const response = await fetch(domain + ajaxArgs.url, {
                method: 'GET',
                credentials: 'include',
            });
            const parsedJsonObject = await response.json();
            console.log(parsedJsonObject)

            return { status: response.status, json: parsedJsonObject}
        }
        ajaxPostUsingFetch = async (ajaxArgs) => {
            const response = await fetch(domain + ajaxArgs.url, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(ajaxArgs.body),
                headers: {
                    'Content-Type': 'application/json'
// 'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            return response.status
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
                xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
                xhr.crossOrigin = true
                xhr.withCredentials = true;
                console.log(JSON.stringify(body));
                xhr.send(JSON.stringify(body));
                return;
            }

            xhr.send();
        }
    }

    globalThis.AjaxModule = new AjaxModule();
})()
