import navLink from "./navLink.js";

export default class MenuPage {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render(pages, isAuth) {
        this.#parent.innerHTML = '';
        this.#parent.className = '';
        const body = document.getElementById('body');
        body.className = '';
        Object.keys(config).forEach((menuKey) => {
            const { href, text } = config[menuKey];
            const menuItem = document.createElement('a');
            if (text === 'Войти' || text === 'Зарегистрироваться') {
                if (!isAuth) {
                    menuItem.href = href;
                    menuItem.textContent = text;
                    menuItem.dataset.section = menuKey;
                    this.#parent.appendChild(menuItem);
                }
            } else {
                menuItem.href = href;
                menuItem.textContent = text;
                menuItem.dataset.section = menuKey;
                this.#parent.appendChild(menuItem);
            }
        });
        if (!isAuth) {
            const loginLink = this.links("login", pages, "login");
            const signupLink = this.links("signup", pages, "signup");
        }
        const filmLink = this.links("film", pages, "film");
        const profileLink = this.links("profile", pages, "profile");
        const profileChengeLink = this.links("profileChenge", pages, "profileChange")
    }

    links(data_sector, pages, page) {
        const link = this.#parent.querySelector(`[data-section=${data_sector}]`)
        const evnt = new navLink(link);
        evnt.render('click', pages[`${page}`]);
        return link
    }
}