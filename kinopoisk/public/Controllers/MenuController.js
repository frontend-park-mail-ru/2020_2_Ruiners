import Bus from '../modules/EventBus.js';
import filmService from '../Services/filmService.js';
import MenuPage from '../Views/MenuPage.js';
import { application } from '../config.js';

export default function Menu() {
  let random = Math.floor(Math.random() * 20) + 1;
  Bus.on('MenuFilms', (data) => {
    const { lentas, call } = data;
    let j = 0;
    for (let i = 0; i < lentas.length; i++) {
      let responseBody;
      filmService.getByGenre(lentas[i].genre)
        .then((res) => {
          responseBody = res.get;
          call(responseBody, res, j, i);
          j++;
        });
    }
  });
  filmService.getById(random).then((res) => {
    if (res.ok) {
      const menu = new MenuPage(application);
      menu.render(res.get);
      const buttonGo = document.getElementById('menuFilm');
      buttonGo.addEventListener('click', () => {
        Bus.emit('GoFilm', random);
      });
    }
  });
}
