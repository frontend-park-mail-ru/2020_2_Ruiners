(function() {

    const domain = 'http://95.163.208.72:8000';
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
                mode: 'cors',
            });
            const parsedJsonObject = await response.json();

            return { status: response.status, json: parsedJsonObject}
        }
        ajaxPostUsingFetch = async (ajaxArgs) => {
            const response = await fetch(domain + ajaxArgs.url, {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
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

            const params = {
                method: method,
                credentials: 'include',
                mode: 'cors',
            };
            if (body) {
                params.body = JSON.stringify(body);
                params.headers = {
                    'Content-Type': 'application/json'
// 'Content-Type': 'application/x-www-form-urlencoded',
                };
            }
            return fetch(url, params)
        }
    }

    globalThis.AjaxModule = new AjaxModule();
})()
