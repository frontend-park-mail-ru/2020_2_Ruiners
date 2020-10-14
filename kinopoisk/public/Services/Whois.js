export default class Whois {
    static getLogin(menuPage, callback) {
        let responseBody;
        ajaxGetUsingFetch({ url: '/whois', body: null })
            .then( (res) => {
                try {
                    responseBody = JSON.parse(JSON.stringify(res.json));
                } catch (e) {
                    menuPage();
                    return;
                }
                const response = { status: res.status, json: responseBody };
                callback(response);
            })
    }
}