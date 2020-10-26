export default class Router {
    constructor (root) {
        this.routes = {};

        this.root = root;
    }

    register (path, View) {
        this.routes[ path ] = View;
        return this;
    }

    open (path) {
        const route = this.routes[ path ];

        if (!route) {
            this.open('/');
            return;
        }

        if (window.location.pathname !== path) {
            window.history.pushState(
                null,
                '',
                path
            );
        }
        route();
    }

    start () {
        console.log("start");
        this.root.addEventListener('click', function (event) {
            if (!(event.target instanceof HTMLAnchorElement)) {
                return;
            }
            event.preventDefault();
            const link = event.target;

            console.log({
                eventTarget: link,
                pathname: link.pathname
            });

            this.open(link.pathname);
        }.bind(this));

        window.addEventListener('popstate', function () {
            const currentPath = window.location.pathname;

            this.open(currentPath);
        }.bind(this));
        const currentPath = window.location.pathname;

        this.open(currentPath);
    }
}