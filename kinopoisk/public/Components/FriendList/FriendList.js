import friendListT from './FriendList.handlebars';
import { domain } from '../../config.js';
import Delete from '../Delete/Delete';
import styles from './FriendList.scss';

export default class FriendList {
  constructor(context) {
    const { parent, body, search, header } = context;
    this.friendList = document.createElement('div');
    this.search = search;
    this.header = header;
    this.parent = parent;
    this.body = body;
    this.template = friendListT;
    this.body.forEach((element) => {
      const del = new Delete({ what: 'profile', id: element.id });
      element.del = del.getTemplate();
    });
  }

  render() {
    this.parent.appendChild(this.friendList);
    this.body.forEach((element) => {
      element.domain = domain;
    });
    this.friendList.innerHTML = this.template({
      search: this.search,
      header: this.header,
      friends: this.body,
      styles,
    });
  }

  hide() {
    this.friendList.innerHTML = '';
  }

  remove(friendId) {
    let rightIndex = 0;
    this.body.forEach((element, index) => {
      if (element.id === friendId) {
        rightIndex = index;
      }
    });
    this.body.splice(rightIndex, 1);
  }
}
