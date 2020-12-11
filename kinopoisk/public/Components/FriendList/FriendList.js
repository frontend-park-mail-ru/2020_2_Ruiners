import friendListT from './FriendList.handlebars';
import { domain } from '../../config.js';
import Delete from '../Delete/Delete';
import stylesDelete from '../Delete/Delete.scss';
import styles from './FriendList.scss';

export default class FriendList {
  constructor(context) {
    const { parent, body } = context;
    this.friendList = document.createElement('div');
    this.parent = parent;
    this.body = body;
    this.template = friendListT;
    this.body.forEach((element) => {
      const del = new Delete({ what: 'people', id: element.id });
      element.del = del.template({
        id: element.id,
        what: 'profile',
        styles: stylesDelete,
      });
    });
  }

  render() {
    this.parent.appendChild(this.friendList);
    this.body.forEach((element) => {
      element.domain = domain;
    });
    this.friendList.innerHTML = this.template({
      friends: this.body,
      styles: styles,
    });
  }

  hide() {
    this.friendList.innerHTML = '';
  }

  remove(friendId) {
    let rightIndex = 0;
    this.body.forEach((element, index) => {
      if (element.id == friendId) {
        rightIndex = index;
      }
    });
    this.body.splice(rightIndex, 1);
  }
}
