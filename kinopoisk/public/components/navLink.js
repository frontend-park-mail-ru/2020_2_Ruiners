export default class navLink {
    #link;

    constructor(link) {
      this.#link = link;
    }

    render(callback) {
      this.#link.addEventListener('click', ((evt) => {
        evt.preventDefault();
        callback();
      }));
    }
}
