export default class evtListener {
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
