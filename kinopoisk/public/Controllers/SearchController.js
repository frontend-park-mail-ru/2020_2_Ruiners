import SearchPage from '../Views/SearchPage';
import { application } from '../config';
import Bus from '../modules/EventBus';
import FilmService from '../Services/filmService';
import PersonService from '../Services/personService';
import UserService from '../Services/userService';

export default function SearchController() {
  Bus.on('search', async (context) => {
    let { str, call } = context;
    str = str.trim();
    if (str !== '') {
      const films = await FilmService.getSearch(str);
      if (!films.ok) {
        return;
      }
      const persons = await PersonService.getSearch(str);
      if (!persons.ok) {
        return;
      }
      const users = await UserService.getSearch(str);
      if (!users.ok) {
        return;
      }
      films.get = films.get.sort((a, b) => {
        if (a.rating > b.rating) {
          return -1;
        }
        if (a.rating < b.rating) {
          return 1;
        }
        // a должно быть равным b
        return 0;
      });
      call(films.get, persons.get, users.get);
    }
  });
  const page = new SearchPage({
    parent: application,
  });
  page.render();
}
