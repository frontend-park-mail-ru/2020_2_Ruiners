export default class NavLink {
  constructor(link) {
    this.link = link;
  }

  render(event, callback) {
    this.link.addEventListener(`${event}`, ((evt) => {
      evt.preventDefault();
      callback();
    }));
  }
}
