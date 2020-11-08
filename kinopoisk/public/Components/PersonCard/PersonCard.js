import personCardT from './PersonCard.handlebars'

export default class PersonCard {

    constructor(context = {}) {
        const {
            body, parent
        } = context;
        this.card = document.createElement('div');
        this.parent = parent;
        this.body = body;
        this.template = personCardT;
    }

    render() {
        this.parent.appendChild(this.card);
        this.card.innerHTML = this.template({
            Name: this.body.Name,
            Image: this.body.Image,
            BornDate: this.body.BornDate,
            BornPlace: this.body.BornPlace,
        });
    }
}

