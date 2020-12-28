import notificationT from './Notification.handlebars';
import styles from './Notification.scss';

export default class Notes {
  constructor(context) {
    const { body, parent, success } = context;
    this.body = body;
    this.success = success;
    this.template = notificationT;
    this.parent = parent;
    this.note = document.createElement('div');
  }

  render() {
    this.parent.appendChild(this.note);
    this.note.innerHTML = this.getTemplate();
  }
  hide() {
    this.note.innerHTML = '';
  }
  getTemplate() {
    return this.template({
      body: this.body,
      styles: styles,
      success: this.success,
    });
  }
}
