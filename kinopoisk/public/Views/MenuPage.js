import Base from './Base.js';
import FilmLenta from '../Components/FilmLenta/FilmLenta.js';
import filmService from "../Services/filmService.js";

export default class MenuPage extends Base {
    constructor(parent) {
      super(nav);
      this.parent = parent;
    }

    render() {
      super.render(false);
      this.parent.innerHTML = '';
      this.parent.className = '';
      const body = document.getElementById('body');
      body.className = 'main__black';
      if(!navigator.onLine) {
        const info = document.createElement('div');
        info.textContent = 'Нет подключения к интернету, но не беда! Можете посмотреть на лучшие фильмы на данный момент!';
        nav.insertAdjacentHTML('afterend', 'Нет подключения к интернету, но не беда! Можете посмотреть на лучшие фильмы на данный момент!');
      }
      const lentas = [
        {
          rusGenre:'Фантастика',
          genre: 'fantasy',
          parent: this.parent,
        },
        {
          rusGenre: 'Комедии',
          genre: 'comedy',
          parent: this.parent,
        },
      ];
      for (let i = 0; i < lentas.length; i++) {
        let responseBody;
        filmService.getByGenre(lentas[i].genre)
            .then((res) => {
              try {
                responseBody = res.get;
              } catch (e) {
                this.menuPage();
                return;
              }
              if (res.ok) {
                const lenta = new FilmLenta({
                  genre: lentas[i].rusGenre,
                  body: responseBody,
                  parent: application
                });
                lenta.render();
              } else {
                this.menuPage();
              }
            });

      }
    }
}
