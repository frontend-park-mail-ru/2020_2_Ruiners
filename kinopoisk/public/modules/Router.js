export default class Router {
  constructor(root) {
    this.routes = {};

    this.root = root;
  }

  register(path, View) {
    this.routes[path] = View;
    return this;
  }

  open(path, params = {}) {
    const { id } = params;
    const route = this.routes[path];
    let allPath = path;
    if (!route) {
      this.open('/');
      return;
    }
    if (id !== undefined && id !== '') {
      allPath = `${allPath}/${id}`;
    }
    if (window.location.pathname !== allPath) {
      window.history.pushState(
        null,
        '',
        allPath,
      );
    }
    route({ id });
  }

  start() {
    this.root.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLAnchorElement)
          && !(event.target instanceof HTMLImageElement)) {
        return;
      }
      event.preventDefault();
      const { target } = event;
      let link;
      if (target instanceof HTMLImageElement) {
        link = target.parentNode;
      } else {
        link = target;
      }
      if (link.pathname.indexOf('undefined') !== -1) {
        return;
      }
      const pathObject = this.split(link.pathname);
      this.open(pathObject.path, { id: pathObject.param });
    });

    window.addEventListener('popstate', (event) => {
      const currentPath = window.location.pathname;
      const pathObject = this.split(currentPath);
      this.open(pathObject.path, { id: pathObject.param });
    });
    const currentPath = window.location.pathname;
    const pathObject = this.split(currentPath);
    this.open(pathObject.path, { id: pathObject.param });
  }

  split(currentPath) {
    let path;
    let array = currentPath.split('/');
    path = array[1];
    let param = array[2];
    if(path) {
      path = '/' + path;
    }
    return {
      path,
      param,
    };
  }
}
