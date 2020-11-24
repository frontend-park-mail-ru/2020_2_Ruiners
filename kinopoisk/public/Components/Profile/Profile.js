import profileT from './Profile.handlebars';
import { domain } from "../../config.js";

export default class Profile {
    constructor(context = {}) {
        const {
            body, parent,
        } = context;
        this.profile = document.createElement('div');
        this.parent = parent;
        this.body = body;
        this.template = profileT;
    }

    render() {
        this.parent.appendChild(this.profile);
        this.profile.innerHTML = this.template({
            id: this.body.id,
            Login: this.body.Login,
            button: this.body.button,
            domain: domain,
            random: Math.random(),
        });
    }
}