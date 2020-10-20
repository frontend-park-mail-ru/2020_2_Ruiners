export default class Button {
    button;
    #classname;
    #text;
    #parent;
    template;

    constructor(context = {}) {
        const { classname, text, parent } = context;
        this.button = document.createElement('div');
        this.#classname = classname;
        this.#text = text;
        this.#parent = parent;
        this.template = Handlebars.templates['Button'];
    }

    render(callback) {
        this.#parent.appendChild(this.button);
        this.button.innerHTML = this.template({
            classname: this.#classname,
            text: this.#text
        });
        this.button.addEventListener('click', evt => {
            evt.preventDefault();
            callback(evt);
        });
    }
}