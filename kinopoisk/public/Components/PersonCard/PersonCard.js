import personCardT from './PersonCard.handlebars';

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
      Name: this.body.name,
      Image: this.body.image,
      BornDate: this.body.born_date,
      BornPlace: this.body.born_place,
    });
  }
}
