import filmService from '../Services/filmService.js';
import GenrePage from '../Views/GenrePage.js';
import { application } from '../config.js';
import Bus from '../modules/EventBus.js';

export default function Genre(params) {
  const { id } = params;
  filmService.getByGenre(id)
    .then((res) => {
      if (res.ok) {
        const page = new GenrePage({ parent: application, genre: id });
        const responseBody = res.get;
        page.render(responseBody);
      } else {
        Bus.emit('main');
      }
    });
}
