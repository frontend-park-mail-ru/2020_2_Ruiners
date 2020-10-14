export default class A {
    #a
    #classname;
    #parent;

    constructor(parent, classname) {
        this.#a = document.createElement('a')
        this.#parent = parent;
        this.#classname = classname;
    }

    render() {
        this.#parent.appendChild(this.#a);
        this.#a.className = this.#classname;
        return this.#a;
    }

    placeContent(inner) {
        this.#a.innerHTML = inner;
        return this.#a;
    }
}