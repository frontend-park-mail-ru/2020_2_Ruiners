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
      classname: '',
      id: 'msg_button',
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
      Button: this.msgButton.template({
        classname: this.msgButton.styles.buttons__forComments,
        text: 'Отправить',
        id: 'msg_button',
        type: 'submit',
        styles: this.msgButton.styles,
      }),
      styles,
    });
  }

  hide() {
    this.comments.innerHTML = '';
  }
}
