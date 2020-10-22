import { menuPage } from "../main.js";
import Navbar from "./Navbar.js";
import sessionService from '../Services/sessionService.js';

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
        sessionService.me()
        .then(res => {
            console.log(res);
            if (!res.ok) {
                isAuthorized = false;
            } else {
                isAuthorized = true;
            }
            const navbar = new Navbar(nav);
            navbar.render(isAuthorized, res);
        });
    }

}
