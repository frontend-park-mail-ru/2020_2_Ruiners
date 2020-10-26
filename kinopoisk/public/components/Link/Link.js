export default class Link {
    a

    #classname;

    #parent;

    #pathname

    constructor(context) {
      const { parent, classname, pathname } = context;
      this.a = document.createElement('a');
      this.#parent = parent;
      this.#classname = classname;
      this.#pathname = pathname;
    }

    render() {
        this.a.className = this.#classname;
        this.a.href = this.#pathname;
        this.#parent.appendChild(this.a);
        return this.a;
    }

    placeContent(inner) {
      this.a.innerHTML = inner;
      return this.a;
    }
}
