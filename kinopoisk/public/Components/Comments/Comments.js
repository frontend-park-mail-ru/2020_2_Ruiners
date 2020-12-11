import Button from '../Button/Button.js';
import commentT from './Comments.handlebars';
import stylesButton from '../Button/Button.scss';
import styles from './Comments.scss';
import stylesMain from '../../static/CSS/main.scss';

export default class Comments {
  constructor(context = {}) {
    const { parent, body, isAuthorized } = context;
    this.comments = document.createElement('div');
    this.parent = parent;
    this.body = body;
    this.isAuthorized = isAuthorized;
    this.msgButton = new Button({
      classname: stylesButton.buttons__marginForFilmCar,
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
        classname: stylesButton.buttons__forComments,
        text: 'Отправить',
        id: 'msg_button',
        type: 'submit',
        styles: stylesButton,
      }),
      styles,
      stylesMain,
    });
  }

  hide() {
    this.comments.innerHTML = '';
  }
}
