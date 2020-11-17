import OfflinePageT from './OfflinePage.handlebars'
import './OfflinePage.scss'

export default class OfflinePage {
    constructor(parent) {
        this.parent = parent;
        this.page = document.createElement('div');
        this.template = OfflinePageT;
    }

    render() {
        const body = document.getElementById('body');
        body.className = 'offline_background';
        this.parent.appendChild(this.page);
        this.page.innerHTML = this.template();
    }
}