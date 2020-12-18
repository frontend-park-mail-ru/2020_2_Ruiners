import Button from '../Button/Button.js';
import commentT from './Comments.handlebars';
import styles from './Comments.scss';

export default class Comments {
  constructor(context = {}) {
    const { parent, body, isAuthorized } = context;
    this.comments = document.createElement('div');
    this.parent = parent;
    this.body = body;
    this.isAuthorized = isAuthorized;
    this.msgButton = new Button({
      templateClass: 'buttons__forComments',
      id: 'msg_button',
      text: 'Отправить',
      parent: null,
    });
    this.template = commentT;
  }

  render() {
    this.parent.appendChild(this.comments);
    let noComments = true;
    if (this.body.length !== 0) {
      noComments = false;
    }
    this.comments.innerHTML = this.template({
      noComments,
      isAuth: this.isAuthorized,
      comments: this.body,
      Button: this.msgButton.getTemplate(),
      styles,
    });
  }

  hide() {
    this.comments.innerHTML = '';
  }
}
