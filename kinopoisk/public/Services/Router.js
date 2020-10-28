export default class Router {
    constructor (root) {
        this.routes = {};

        this.root = root;
    }

    register (path, View) {
        this.routes[ path ] = View;
        return this;
    }

    open (path, params= {}) {
        const { id } = params;
        const route = this.routes[ path ];
        let allPath = path;
        if (!route) {
            this.open('/');
            return;
        }
        if(id != undefined) {
            allPath = allPath + '/' + id;
        }
        if (window.location.pathname !== path) {
            window.history.pushState(
                null,
                '',
                allPath
            );
        }
        route({id: id});
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
            let pathObject = this.split(currentPath);
            this.open(pathObject.path, { id: pathObject.param });
        }.bind(this));
        const currentPath = window.location.pathname;
        console.log(currentPath);
        this.open(currentPath);
    }

    split(currentPath) {
        let path, param, i;
        for(i = 1; currentPath[i] !== '/' && i < currentPath.length; i++) {
            path[i-1] = currentPath[i];
        }
        if( i === currentPath.length) {
            return {
                path: path,
                param: param
            }
        }
        for( let j = i + 1; j < currentPath.length; j++) {
            param = param + currentPath[j];
        }
        return {
            path: path,
            param: param
        }
    }
}