import Base from '../Base';
import { nav } from '../../config';
import Search from '../../Components/Search/Search';
import Bus from '../../modules/EventBus';
import FilmLenta from '../../Components/FilmLenta/FilmLenta';
import styles from '../../static/CSS/main.scss';
import FriendList from '../../Components/FriendList/FriendList';
import PersonLenta from '../../Components/PersonLenta/PersonLenta';
import stylesSearchPage from './SearchPage.scss';
import debounce from '../../modules/debounce';
import unicodeToWin1251_UrlEncoded from '../../modules/enCode';

export default class SearchPage extends Base {
  constructor(context) {
    const { parent } = context;
    super(nav);
    this.parent = parent;
  }

  render(value) {
    super.render(false);
    this.parent.innerHTML = '';
    const body = document.getElementById('body');
    body.className = styles.page;
    const search = new Search({
      parent: this.parent,
    });
    search.render();

    // Вычленение эллементов со страницы
    const searchInput = document.getElementById('search');
    const content = document.getElementById('content');
    const allLink = document.getElementById('all');
    const peopleLink = document.getElementById('people');
    const filmsLink = document.getElementById('films');
    const actorsLink = document.getElementById('actors');
    let allBool = true;
    let peopleBool = false;
    let filmsBool = false;
    let actorsBool = false;

    // Обработчики на нажатие вкладок (Люди, фильмы и т д)
    allLink.addEventListener('click', () => {
      this.setClass(allLink, peopleLink, filmsLink, actorsLink);
      allBool = true;
      peopleBool = false;
      filmsBool = false;
      actorsBool = false;
      searchFunction();
    });
    peopleLink.addEventListener('click', () => {
      this.setClass(peopleLink, allLink, filmsLink, actorsLink);
      peopleBool = true;
      allBool = false;
      filmsBool = false;
      actorsBool = false;
      searchFunction();
    });
    filmsLink.addEventListener('click', () => {
      this.setClass(filmsLink, peopleLink, allLink, actorsLink);
      filmsBool = true;
      peopleBool = false;
      allBool = false;
      actorsBool = false;
      searchFunction();
    });
    actorsLink.addEventListener('click', () => {
      this.setClass(actorsLink, filmsLink, peopleLink, allLink);
      actorsBool = true;
      filmsBool = false;
      peopleBool = false;
      allBool = false;
      searchFunction();
    });

    // функция, которая по написанной строке выводит фильмы
    const searchFunction = (evt) => {
      let str;
      if (evt && evt.charCode) {
        str = searchInput.value + String.fromCharCode(evt.charCode);
      } else {
        str = searchInput.value;
      }
      if (str === '') {
        content.innerHTML = '';
      }
      Bus.emit('search', {
        str,
        call: (films, persons, users) => {
          content.innerHTML = '';
          const lentaFilms = new FilmLenta({
            parent: content,
            genre: 'Фильмы',
            body: films,
          });
          const lentaUsers = new FriendList({
            search: true,
            header: 'Люди',
            parent: content,
            body: users,
          });

          const lentaPersons = new PersonLenta({
            parent: content,
            body: persons,
          });

          if (films.length !== 0 && (filmsBool || allBool)) {
            lentaFilms.render();
          }

          if (persons.length !== 0 && (actorsBool || allBool)) {
            lentaPersons.render();
          }

          if (users.length !== 0 && (peopleBool || allBool)) {
            lentaUsers.render();
          }
          const box = this.createBox(content);
        },
      });
    };
    const listener = debounce(searchFunction, 200);
    searchInput.addEventListener('input', (evt) => listener(evt));
    if (value) {
      searchInput.value = unicodeToWin1251_UrlEncoded(value);
      searchFunction();
    }
  }

  createBox(par) {
    const box = document.createElement('div');
    box.className = styles.invisible_box;
    box.id = 'box';
    par.appendChild(box);
    return box;
  }

  setClass(link1, link2, link3, link4) {
    link1.className = stylesSearchPage.search_nav_links_aBig;
    link2.className = stylesSearchPage.search_nav_links_a;
    link3.className = stylesSearchPage.search_nav_links_a;
    link4.className = stylesSearchPage.search_nav_links_a;
  }
}
