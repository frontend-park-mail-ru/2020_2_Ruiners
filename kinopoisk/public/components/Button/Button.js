export default class Button {
    button;

    #classname;

    #text;

    #parent;

    template;

    #type;

    constructor(context = {}) {
      const {
        classname, text, parent, type,
      } = context;
      this.button = document.createElement('div');
      this.#classname = classname;
      this.#text = text;
      this.#parent = parent;
      this.template = Handlebars.templates.Button;
      this.#type = type;
    }

    render(callback) {
      this.#parent.appendChild(this.button);
      this.button.innerHTML = this.template({
        classname: this.#classname,
        text: this.#text,
      });
      this.button.addEventListener('click', (evt) => {
        evt.preventDefault();
        callback(evt);
      });
    }

    renderSubmit() {
      this.button = document.createElement('button');
      this.button.className = this.#classname;
      this.button.textContent = this.#text;
      this.button.type = this.#type;
      this.#parent.appendChild(this.button);
    }
}
