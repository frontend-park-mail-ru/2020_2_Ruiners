import SearchPage from '../Views/SearchPage';
import { application } from '../config';
import Bus from '../modules/EventBus';
import FilmService from '../Services/filmService';
import PersonService from '../Services/personService';
import UserService from '../Services/userService';

export default function SearchController() {
  Bus.on('search', (context) => {
    let { str, call } = context;
    str = str.trim();
    if (str !== '') {
      FilmService.getSearch(str).then((films) => {
        if (films.ok) {
          PersonService.getSearch(str).then((persons) => {
            if (films.ok) {
              UserService.getSearch(str).then((users) => {
                if (users.ok) {
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
            }
          });
        }
      });
    }
  });
  const page = new SearchPage({
    parent: application,
  });
  page.render();
}
