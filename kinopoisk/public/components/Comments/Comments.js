import Button from '../Button/Button.js';

export default class Comments {
    comments;

    #parent;

    #body;

    template;

    msgButton;

    constructor(context = {}) {
        const { parent, body } = context;
        this.comments = document.createElement('div');
        this.#parent = parent;
        this.#body = body;
        this.msgButton = new Button({
            classname: 'buttons buttons__marginForFilmCard',
            id: 'msg_button',
            parent: null,
        });
        this.template = Handlebars.templates.Comments;
    }

    render() {
        this.#parent.appendChild(this.comments);
        this.comments.innerHTML = this.template({
            comments: this.#body,
            Button: this.msgButton.template({
                classname: 'buttons buttons__forComments',
                text: 'Отправить',
                id: 'msg_button',
                type: 'submit',
            }),
        });
    }
}
