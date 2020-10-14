export default class Button {
    #button
    #parent;
    #classname;

    constructor(parent, classname) {
        this.#button = document.createElement('button');
        this.#parent = parent;
        this.#classname = classname;
    }

    render() {
        this.#parent.appendChild(this.#button);
        this.#button.className = this.#classname;
        return this.#button;
    }

    placeContent(inner) {
        this.#button.innerHTML = inner;
        return this.#button;
    }
}