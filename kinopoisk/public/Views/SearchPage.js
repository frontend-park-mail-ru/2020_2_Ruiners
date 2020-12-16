import Base from './Base';
import { nav } from '../config';
import Search from '../Components/Search/Search';
import Bus from '../modules/EventBus';
import FilmLenta from '../Components/FilmLenta/FilmLenta';
import styles from '../static/CSS/main.scss';
import FriendList from '../Components/FriendList/FriendList';
import PersonLenta from '../Components/PersonLenta/PersonLenta';
import stylesSearch from '../Components/Search/Search.scss';
import debounce from '../modules/debounce';

export default class SearchPage extends Base {
  constructor(context) {
    const { parent } = context;
    super(nav);
    this.parent = parent;
  }

  render() {
    super.render(false);
    this.parent.innerHTML = '';
    const body = document.getElementById('body');
    body.className = styles.page;
    const search = new Search({
      parent: this.parent,
    });
    search.render();
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
    const searchFunction = (evt) => {
      let str;
      if (evt) {
        str = searchInput.value + String.fromCharCode(evt.charCode);
      } else {
        str = searchInput.value;
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
          let box = this.createBox(content);
        },
      });
    };
    const listener = debounce(searchFunction, 200);
    searchInput.addEventListener('keypress', (evt) => listener(evt));
  }

  createBox(par) {
    const box = document.createElement('div');
    box.className = styles.invisible_box;
    box.id = 'box';
    par.appendChild(box);
    return box;
  }

  setClass(link1, link2, link3, link4) {
    link1.className = stylesSearch.search_nav_links_aBig;
    link2.className = stylesSearch.search_nav_links_a;
    link3.className = stylesSearch.search_nav_links_a;
    link4.className = stylesSearch.search_nav_links_a;
  }
}
