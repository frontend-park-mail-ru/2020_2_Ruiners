import personCardT from './PersonCard.handlebars';
import styles from './PersonCard.scss';

export default class PersonCard {
  constructor(context = {}) {
    const {
      body, parent,
    } = context;
    this.card = document.createElement('div');
    this.parent = parent;
    this.body = body;
    this.template = personCardT;
  }

  render() {
    this.parent.appendChild(this.card);
    this.card.innerHTML = this.template({
      styles: styles,
      Name: this.body.name,
      Image: this.body.image,
      BornDate: this.body.born_date,
      BornPlace: this.body.born_place,
    });
  }
}
