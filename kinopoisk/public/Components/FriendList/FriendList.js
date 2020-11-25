import friendListT from './FriendList.handlebars';
import {domain} from "../../config.js";
import Delete from "../Delete/Delete";

export default class FriendList {
    constructor(context) {
        const { parent, body } = context;
        this.friendList = document.createElement('div');
        this.parent = parent;
        this.body = body;
        this.template = friendListT;
        this.body.forEach(element => {
             const del = new Delete({ what: "people", id: element.id});
             element.del = del.template({
                 id: element.id,
                 what: "profile",
             })
        });
    }

    render() {
        this.parent.appendChild(this.friendList);
        this.body.domain = domain;
        this.body.forEach(element => {
            element.domain = domain;
        })
        this.friendList.innerHTML = this.template({
            friends: this.body,
        });
    }

    hide() {
        this.friendList.innerHTML = '';
    }
}