export default class Logout {
    static logout(callback) {
        ajaxGetUsingFetch({ url: '/logout', body: null })
            .then((res) => {
                callback(res);
            });
    }
}