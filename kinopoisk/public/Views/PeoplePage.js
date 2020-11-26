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
        let subscribe = document.getElementById('subscribe');
        let unsubscribe = document.createElement('button');
        let subButton = document.createElement('button');
        let par = subscribe.parentNode;

        let listenerSub = evt => {
            evt.preventDefault();
            subscribe.remove();
            unsubscribe.className = 'button button__red';
            unsubscribe.textContent = 'Отписаться';
            par.appendChild(unsubscribe);
            Bus.emit('subscribe', id);
        }
        let listenerUnsub = evt => {
            evt.preventDefault();
            unsubscribe.remove();
            subButton.className = 'button';
            subButton.textContent = 'Подписаться'
            par.appendChild(subButton);
            Bus.emit('unsubscribe', id);
        }
        let listenerSubscribe = evt => {
            evt.preventDefault();
            subButton.remove()
            unsubscribe.className = 'button button__red';
            unsubscribe.textContent = 'Отписаться'
            par.appendChild(unsubscribe);
            Bus.emit('subscribe', id);
        }
        subscribe.addEventListener('click', listenerSub);
        unsubscribe.addEventListener('click', listenerUnsub);
        subButton.addEventListener('click', listenerSubscribe);
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