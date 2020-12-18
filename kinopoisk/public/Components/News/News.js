import newsT from './News.handlebars';
import { domain } from '../../config';
import styles from './News.scss';

export default class News {
  constructor(context) {
    const { parent, body } = context;
    this.news = document.createElement('div');
    this.parent = parent;
    this.body = body;
    this.template = newsT;
  }

  render() {
    this.parent.appendChild(this.news);
    this.body.forEach((element) => {
      element.domain = domain;
      element.date = new Date(element.date * 1000);
      element.dateTime = `${element.date.getHours()}:${element.date.getMinutes()} ${element.date.getDate()}-${element.date.getMonth()}-${element.date.getFullYear()}`;
    });
    this.news.innerHTML = this.template({
      styles,
      news: this.body,
    });
  }

  hide() {
    this.news.innerHTML = '';
  }
}
