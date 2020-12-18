import Navbar from './Navbar/Navbar.js';
import sessionService from '../Services/sessionService.js';
import Footer from '../Components/Footer/Footer.js';
import { nav } from '../config.js';

export default class Base {
  constructor(parent) {
    this.parent = parent;
  }

  render(flag) {
    const body = document.getElementById('body');
    body.style.backgroundImage = 'none';
    if (flag || nav.innerText === '') {
      this.createNavbar();
    }
    // this.createFooter();
  }

  createNavbar() {
    nav.innerHTML = '';
    let isAuthorized = false;
    if (navigator.onLine) {
      sessionService.me()
        .then((res) => {
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

  createFooter() {
    const footer = new Footer();
    footer.render();
  }
}
