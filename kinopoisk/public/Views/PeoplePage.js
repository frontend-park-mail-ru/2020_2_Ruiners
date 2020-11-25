import {application, nav} from "../config";
import Button from "../Components/Button/Button";
import Profile from "../Components/Profile/Profile";
import Bus from "../modules/EventBus";
import Base from "./Base";

export default class PeoplePage extends Base{
    constructor(parent, data) {
        super(nav);
        this.parent = parent;
        this.data = data;
    }

    render(id) {
        super.render(false);
        const responseBody = this.data;
        const body = document.getElementById('body');
        body.className = 'main__background';
        this.parent.innerHTML = '';
        this.parent.className = '';
        const button = new Button({
            classname: 'buttons__forComments',
            parent: null,
        });
        const profile = new Profile({
            parent: this.parent,
            isProfile: false,
            body: {
                id: responseBody.id,
                Login: responseBody.Login,
                isAuth: responseBody.isAuth,
                button: button.template({
                    classname: '',
                    text: 'Подписаться',
                    id: 'subscribe',
                    type: 'submit',
                })
            }
        });
        profile.render();
        const subscribe = document.getElementById('subscribe');
        subscribe.addEventListener('click', evt => {
            evt.preventDefault();
            Bus.emit('subscribe', id);
        })
        let box = this.createBox();
    }

    createBox() {
        const box = document.createElement('div');
        box.className = 'invisible_box';
        box.id = 'box';
        this.parent.appendChild(box);
        return box;
    }

}