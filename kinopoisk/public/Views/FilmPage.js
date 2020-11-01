import Base from './Base.js';
import FilmCard from '../components/FilmCard/FilmCard.js';
import Comments from "../components/Comments/Comments.js";

export default class FilmPage extends Base {
    #parent
    #body

    constructor(context = {}) {
      super(nav);
      const { parent, body } = context
      this.#parent = parent;
      this.#body = body
    }

    render() {
        super.render(false);
      const body = document.getElementById('body');
      body.className = 'film1';
      let responseBody = JSON.parse(this.#body);
      body.style.backgroundImage =`linear-gradient(to top, #2e2e2e 0%, rgba(0,0,0,0.1) 40%), url(${responseBody.BigImg})`
      this.#parent.innerHTML = '';
      this.#parent.className = '';
      const film = new FilmCard({
          parent: this.#parent,
          body: responseBody
      });
      film.render();
      const comments = [
          {
              login: 'ErikDoter',
              image: 'https://dota-blog.ru/wp-content/uploads/2020/01/480220190515091129.jpg',
              content: 'Мне фильм крайне понравился, говорю это каждому фильму',
              rate: 10,
          },
          {
              login: 'ArkadiyLoh',
              image: 'https://stihi.ru/pics/2013/09/01/8901.jpg',
              content: 'А мне вообще не зашло',
              rate: 0,
          },
          {
              login: 'MI ****ing SHA',
              image: 'https://cdn.segodnya.ua/img/article/11440/23_ls.1528139787.png',
              content: 'Для меня вообще нормально или не нормально, даже не знаю, пишу что хочу это мое мнение я так считаю',
              rate: 5,
          }
      ]
      const commentsObj = new Comments({
          parent: this.#parent,
          body: comments
      })
        commentsObj.render();
    }
}
