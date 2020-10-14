import { createSpan } from './Components.js';

export default class FilmPage {
    #parent

    constructor(parent) {
      this.#parent = parent;
    }

    render() {
      const body = document.getElementById('body');
      body.className = 'film1';
      this.#parent.innerHTML = '';
      this.#parent.className = '';
      const main = document.createElement('div');
      main.className = 'main';
      this.#parent.appendChild(main);
      const ul1 = document.createElement('ul');
      main.appendChild(ul1);
      const li1 = document.createElement('li');
      ul1.appendChild(li1);
      const h1 = document.createElement('h1');
      h1.textContent = 'Начало';
      li1.appendChild(h1);
      const li2 = document.createElement('li');
      ul1.appendChild(li2);
      const rating = document.createElement('div');
      rating.className = 'rating';
      li2.appendChild(rating);
      const h11 = document.createElement('h1');
      rating.appendChild(h11);
      const span = createSpan('colour-text1', '8,7');
      const span1 = createSpan('colour-text2', '110k');
      h11.appendChild(span);
      h11.appendChild(span1);
      const rate = document.createElement('button');
      rate.textContent = 'Оценить';
      rating.appendChild(rate);
      const ul2 = document.createElement('ul');
      main.appendChild(ul2);
      const li3 = document.createElement('li');
      ul2.appendChild(li3);
      const frame = document.createElement('iframe');
      frame.width = '560';
      frame.height = '315';
      frame.src = 'https://www.youtube.com/embed/85Zz1CCXyDI';
      frame.frameborder = '1';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      li3.appendChild(frame);
      const film = document.createElement('div');
      film.className = 'film';
      ul2.appendChild(film);
      const p = document.createElement('p');
      p.textContent = 'О фильме';
      film.appendChild(p);
      const span2 = createSpan('colour-text3', 'Год: 2010');
      const span3 = createSpan('colour-text3', 'Страна: США, Великобритания');
      const span4 = createSpan('colour-text3', 'Режиссер: Кристофер Ноллан');
      p.appendChild(span2);
      p.appendChild(span3);
      p.appendChild(span4);
    }
}
