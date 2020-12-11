import SearchPage from '../Views/SearchPage';
import { application } from '../config';
import Bus from '../modules/EventBus';
import FilmService from '../Services/filmService';

export default function SearchController() {
  Bus.on('search', (context) => {
    const { str, call } = context;
    FilmService.getByGenre('fantasy').then((res) => {
      if (res.ok) {
        console.log(str);
        call(res.get);
      }
    });
  });
  const page = new SearchPage({
    parent: application,
  });
  page.render();
}
