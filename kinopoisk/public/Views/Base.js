import Navbar from './Navbar.js';
import sessionService from '../Services/sessionService.js';

export default class Base {
    #parent;

    constructor(parent) {
      this.#parent = parent;
    }

    render(flag) {
        if(flag || nav.innerText == '') {
            this.createNavbar();
        }
    }

    createNavbar() {
      nav.innerHTML = '';
      let isAuthorized = false;
      console.log("online =", navigator.onLine);
      if(navigator.onLine) {
          sessionService.me()
              .then((res) => {
                  console.log(res);
                  if (!res.ok) {
                      isAuthorized = false;
                  } else {
                      isAuthorized = true;
                  }
                  const navbar = new Navbar(nav);
                  navbar.render(isAuthorized, res);
              });
      } else {
          const navbar = new Navbar(nav);
          navbar.render(isAuthorized, {});
      }
    }
}
