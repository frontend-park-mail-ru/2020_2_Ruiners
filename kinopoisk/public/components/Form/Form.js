import Button from "../Button/Button.js";
import { createDiv, createInput } from "../../Views/Components.js";

export default class Form {
    #headConf;
    #configInput;
    #sub;

    #valid(form, reg, input, text) {
        const diver = createDiv('error', form);
        input.onblur = function () {
          if (!reg.test(this.value)) {
            this.classList.add('invalid');
            diver.innerHTML = text;
          }
        };
      
        input.onfocus = function () {
          if (this.classList.contains('invalid')) {
            this.classList.remove('invalid');
            diver.innerHTML = '';
          }
        };
      }

    constructor(headConf, configInput, sub) {
        this.#headConf = headConf;
        this.#configInput = configInput;
        this.#sub = sub;
    }

    render() {
        const { head, textContent, style } = this.#headConf;
        const form = document.createElement('form');
        const formr = [];
        formr.push(form);
      
        if (head) {
          const header = document.createElement('h2');
          header.textContent = textContent;
          header.style = style;
          form.appendChild(header);
        }
      
        this.#configInput.forEach((menuKey) => {
          const { type, name, text, required } = menuKey;
          const input = createInput(type, name, text);
          input.required = required;
          form.appendChild(input);
          formr.push(input);
        });
        const { text, className} = this.#sub
        const submitpass = new Button({
            parent: form,
            text: text,
            classname: 'buttons buttons__margin',
            type: 'submit'
        });
        submitpass.renderSubmit();
      
        let i = 1;
        this.#configInput.forEach((menuKey) => {
          const { reg, errorVal } = menuKey;
          if (menuKey.valid) {
            this.#valid(form, reg, formr[i], errorVal);
          }
          i += 1;
        });
        return formr;
    }      
}