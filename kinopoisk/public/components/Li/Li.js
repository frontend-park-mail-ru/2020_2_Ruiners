export default class Li {
    #li;
    #parent;
    #classname;

    constructor(parent, classname) {
        this.#li = document.createElement('li');
        this.#parent = parent;
        this.#classname = classname;
    }

    render() {
        this.#parent.appendChild(this.#li);
        this.#li.className = this.#classname;
        return this.#li;
    }

    placeContent(inner) {
        this.#li.innerHTML = inner;
    }
}