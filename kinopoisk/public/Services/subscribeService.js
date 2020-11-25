import { AjaxModule } from '../modules/ajax.js';

export default class SubscribeService {
    static async fetchGetFollowers() {
        const res = await AjaxModule.ajaxGet({ url: `/authors` });
        const parsedJsonObject = await res.json();
        return { status: res.status, json: parsedJsonObject };
    }

    static async fetchGetNews() {
        const res = await AjaxModule.ajaxGet({ url: `/news` });
        const parsedJsonObject = await res.json();
        return { status: res.status, json: parsedJsonObject };
    }

    static async fetchPostFollow(user_id) {
        const res = await AjaxModule.ajaxPost({ url: '/follow', body: { user_id } });
        return res.status;
    }

    static async fetchPostUnfollow(UserId) {
        const res = await AjaxModule.ajaxPost({ url: '/unfollow', body: { UserId } });
        return res.status;
    }

    static async getFollowers() {
        const data = { ok: false, errmsg: undefined, get: undefined };
        const res = await this.fetchGetFollowers();
        if (res.status !== 200) {
            data.errmsg = 'Нет подписок';
        } else {
            data.ok = true;
            data.get = res.json;
        }
        return data;
    }

    static async getNews() {
        const data = { ok: false, errmsg: undefined, get: undefined };
        const res = await this.fetchGetNews();
        if (res.status !== 200) {
            data.errmsg = 'Нет новостей';
        } else {
            data.ok = true;
            data.get = res.json;
        }
        return data;
    }

    static async PostFollow(id) {
        const data = { ok: false, errmsg: undefined };
        const res = await this.fetchPostFollow(parseInt(id));
        if (res !== 200) {
            data.errmsg = 'Ошибка';
        } else {
            data.ok = true;
        }
        return data;
    }

    static async PostUnfollow(id) {
        const data = { ok: false, errmsg: undefined };
        const res = await this.fetchPostUnfollow(parseInt(id));
        if (res !== 200) {
            data.errmsg = 'Ошибка';
        } else {
            data.ok = true;
        }
        return data;
    }
}
