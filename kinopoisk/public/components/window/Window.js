import Button from "../Button/Button.js";
import Bus from "../../Services/EventBus.js";
export default class Window {
    window;
    #classname;
    #text;
    #parent;
    template;

    constructor(context = {}) {
        const { parent } = context;
        this.#parent = parent;
        this.window = document.createElement('div');
        this.template = Handlebars.templates['Window'];
    }

    render(callback) {
        this.#parent.appendChild(this.window);
        this.window.innerHTML = this.template();
        const okno = document.getElementById('okno');
        const buttonProfile = new Button({
            parent: okno,
            classname: 'buttons',
            text: 'Профиль'
        });
        const buttonSetting = new Button( {
            parent: okno,
            classname: 'buttons',
            text: 'Настройки'
        });
        buttonProfile.render(() => {
            Bus.emit('loginPasswordChange', (buttonProfile));
        });
        buttonSetting.render( () => {
            Bus.emit('Change', buttonSetting);
        });
    }
    close() {
        this.window.innerHTML = '';
    }
}