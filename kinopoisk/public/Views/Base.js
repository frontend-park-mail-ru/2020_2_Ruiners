import Whois from "../Services/Whois.js";
import { menuPage } from "../main.js";
import Navbar from "./Navbar.js";

export default class Base {
    #parent;

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.createNavbar();
    }

    createNavbar() {
        nav.innerHTML = '';
        let isAuthorized = false;
        Whois.getLogin(menuPage, res => {
            if (res.status === 202) {
                isAuthorized = false;
            } else {
                isAuthorized = true;
            }
            const navbar = new Navbar(nav);
            navbar.render(isAuthorized, res);
        });
    }

}