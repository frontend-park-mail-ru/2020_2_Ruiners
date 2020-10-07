import navLink from "./navLink.js";
const { ajaxPostUsingFetch } = globalThis.AjaxModule;
const nav = document.getElementById('navbar');

export default class ProfileChangePage {
    #parent
    #data

    constructor(parent, data) {
        this.#parent = parent;
        this.#data = data
    }

    render(menuPage, profilePage, createNavbar) {
        const body = document.getElementById('body');
        body.className = 'page';

        const form = document.createElement('form');
        this.#parent.className = 'wrapper__form chenge';
        this.#parent.appendChild(form);

        const header = document.createElement('h2');
        header.textContent = 'Настройки пользователя';
        header.style = 'color:#FFFFFF; margin-left: 10px';
        form.appendChild(header);
        const responseBody = JSON.parse(this.#data);
        const loginInput = createInput('login', 'login', `${responseBody.login}`);
        loginInput.required = true;

        form.appendChild(loginInput);
        const submitLogin = createInputSubmit('Изменить логин', 'secondary');
        form.appendChild(submitLogin);

        valid(form, /[A-Za-z0-9]{5,15}/, loginInput, 'Недопустимый логин');

        const formLink = new navLink(form);
        formLink.render('submit', () => {
            if (!loginInput.classList.contains('invalid')) {
                const login = loginInput.value.trim();
                ajaxPostUsingFetch({ url: '/chengelogin',
                    body: {
                        login
                    }
                })
                    .then(res => {
                        if (res === 200) {
                            nav.innerHTML = '';
                            createNavbar();
                            profilePage();
                        } else {
                            alert('error');
                        }
                    });
            }
        });
        const formPass = document.createElement('form');
        this.#parent.appendChild(formPass);

        const passwordInputOld = createInput('password', 'password', 'Старый пароль');
        passwordInputOld.required = true;
        formPass.appendChild(passwordInputOld);

        const passwordInputNew1 = createInput('password', 'password', 'Новый пароль');
        passwordInputNew1.required = true;
        formPass.appendChild(passwordInputNew1);

        const passwordInputNew2 = createInput('password', 'password', 'Повторите новый пароль');
        passwordInputNew2.required = true;
        formPass.appendChild(passwordInputNew2);

        const submitpass = createInputSubmit('Изменить пароль', 'secondary');
        formPass.appendChild(submitpass);

        valid(formPass, /.{8,16}/, passwordInputNew1, 'Недопустимый пароль 1');
        valid(formPass, /.{8,16}/, passwordInputNew2, 'Недопустимый пароль 2');

        const formPassLink = new navLink(formPass);
        formPassLink.render('submit', () => {
            if (!passwordInputNew1.classList.contains('invalid')
                || !passwordInputNew2.classList.contains('invalid')) {
                const PasswordOld = passwordInputOld.value.trim();
                const Password = passwordInputNew1.value.trim();
                const pass = passwordInputNew2.value.trim();
                if (Password === pass) {
                    ajaxPostUsingFetch({ url: '/chengepass',
                        body: {
                            PasswordOld,
                            Password
                        }
                    })
                        .then(res => {
                            if (res === 200) {
                                profilePage();
                            } else {
                                alert('error');
                            }
                        });
                }
            }
        });

        const formAvatar = document.createElement('form');
        this.#parent.appendChild(formAvatar);

        const imgAvatar = createInput('file', 'file', 'Фото');
        formAvatar.appendChild(imgAvatar);

        const buttonBack = document.createElement('button');
        buttonBack.href = '/';
        buttonBack.textContent = 'Назад';
        buttonBack.className = 'secondary';
        buttonBack.dataset.section = 'profile';
        const buttonBackLink = new navLink(buttonBack);
        buttonBackLink.render('click', () => {
            profilePage();
        });
        this.#parent.appendChild(buttonBack);
    }
}