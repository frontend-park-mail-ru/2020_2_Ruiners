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
            if (link.pathname == '/' + undefined || link.pathname == undefined) {
                return ;
            }
            let pathObject = this.split(link.pathname);
            this.open(pathObject.path, { id: pathObject.param });
        }.bind(this));

        window.addEventListener('popstate', function () {
            const currentPath = window.location.pathname;
            let pathObject = this.split(currentPath);
            this.open(pathObject.path, { id: pathObject.param });
        }.bind(this));
        let currentPath = window.location.pathname;
        console.log(currentPath);
        let pathObject = this.split(currentPath);
        this.open(pathObject.path, { id: pathObject.param });
    }

    split(currentPath) {
        let path;
        let param = '';
        let i;
        console.log(currentPath);
        for(i = 1; currentPath[i] !== '/' && i < currentPath.length; i++) {}
        path = currentPath.substring(0, i);
        console.log( path );
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