export default class PersonCard {
    card;

    #body

    #parent;

    template;

    constructor(context = {}) {
        const {
            body, parent
        } = context;
        this.card = document.createElement('div');
        this.#parent = parent;
        this.#body = body;
        this.template = Handlebars.templates.PersonCard;
    }

    render() {
        this.#parent.appendChild(this.card);
        this.card.innerHTML = this.template({
            Name: this.#body.Name,
            Image: this.#body.Image,
            BornDate: this.#body.BornDate,
            BornPlace: this.#body.BornPlace,
        });
    }
}

