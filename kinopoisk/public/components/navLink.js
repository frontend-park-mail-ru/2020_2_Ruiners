export default class navLink {
    #link;

    constructor(link) {
      this.#link = link;
    }

    render(event, callback) {
      this.#link.addEventListener(`${event}`, ((evt) => {
        evt.preventDefault();
        callback();
      }));
    }
}
