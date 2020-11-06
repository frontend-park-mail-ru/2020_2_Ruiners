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
        if(id != undefined && id != '') {
            allPath = allPath + '/' + id;
        }
        console.log("sss", allPath);
        if (window.location.pathname !== allPath) {
            window.history.pushState(
                null,
                '',
                allPath
            );
        }
        route({id: id});
    }

    start () {
        this.root.addEventListener('click', function (event) {
            if (!(event.target instanceof HTMLAnchorElement) && !(event.target instanceof HTMLImageElement)) {
                return;
            }
            event.preventDefault();
            const target = event.target;
            let link;
            if (target instanceof HTMLImageElement) {
                link = target.parentNode;
            } else {
                link = target
            }
            if (link.pathname.indexOf('undefined') !== -1) {
                return ;
            }
            let pathObject = this.split(link.pathname);
            this.open(pathObject.path, { id: pathObject.param });
        }.bind(this));

        window.addEventListener('popstate', event => {
            const currentPath = window.location.pathname;
            let pathObject = this.split(currentPath);
            this.open(pathObject.path, { id: pathObject.param });
        });
        let currentPath = window.location.pathname;
        console.log(currentPath);
        let pathObject = this.split(currentPath);
        this.open(pathObject.path, { id: pathObject.param });
    }

    split(currentPath) {
        let path;
        let param = '';
        let i, k, count = 0;
        for(k = 0; k < currentPath.length; k++) {
            if(currentPath[k] == '/') {
                count++;
            }
        }
        if(count > 2) {
            for(k = 1; currentPath[k] != '/' ; k++) {}
            currentPath = currentPath.substring(k);
        }
        for(i = 1; currentPath[i] !== '/' && i < currentPath.length; i++) {}
        path = currentPath.substring(0, i);
        if( i === currentPath.length) {
            return {
                path: path,
                param: param
            }
        }
        param = currentPath.substring(i + 1);
        return {
            path: path,
            param: param
        }
    }
}