import Button from '../Button/Button.js';
import filmService from "../../Services/filmService.js";

export default class Comments {
    comments;

    #parent;

    #body;

    #isAuthorized;

    template;

    msgButton;

    constructor(context = {}) {
        const { parent, body, isAuthorized } = context;
        this.comments = document.createElement('div');
        this.#parent = parent;
        this.#body = body;
        this.#isAuthorized = isAuthorized;
        this.msgButton = new Button({
            classname: 'buttons buttons__marginForFilmCard',
            id: 'msg_button',
            parent: null,
        });
        this.template = Handlebars.templates.Comments;
    }

    render() {
        this.#parent.appendChild(this.comments);
        let noComments = true;
        if(this.#body.length !== 0) {
            noComments = false;
        }
        this.comments.innerHTML = this.template({
            noComments: noComments,
            isAuth: this.#isAuthorized,
            comments: this.#body,
            Button: this.msgButton.template({
                classname: 'buttons buttons__forComments',
                text: 'Отправить',
                id: 'msg_button',
                type: 'submit',
            }),
        });
    }

    hide() {
        this.comments.innerHTML = '';
    }
}