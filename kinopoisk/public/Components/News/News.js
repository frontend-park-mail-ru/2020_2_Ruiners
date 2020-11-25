import newsT from './News.handlebars';
import {domain} from "../../config";

export default class News {
    constructor(context) {
        const { parent, body } = context;
        console.log(body);
        this.news = document.createElement('div');
        this.parent = parent;
        this.body = body;
        this.template = newsT;
    }

    render() {
        this.parent.appendChild(this.news);
        this.body.forEach(element => {
            element.domain = domain;
        })
        this.news.innerHTML = this.template({
            news: this.body,
        })
    }

    hide() {
        this.news.innerHTML = '';
    }
}