import Base from '../Base.js';
import { application, nav } from '../../config.js';
import Button from '../../Components/Button/Button';
import Profile from '../../Components/Profile/Profile.js';
import Bus from '../../modules/EventBus.js';
import FilmLenta from '../../Components/FilmLenta/FilmLenta';
import FriendList from '../../Components/FriendList/FriendList';
import News from '../../Components/News/News';
import styles from '../../static/CSS/main.scss';
import stylesProfilePage from './ProfilePage.scss';
import SessionService from '../../Services/sessionService';
import Notes from '../../Components/Notification/Notification';

export default class ProfilePage extends Base {
  constructor(parent, data) {
    super(nav);
    this.parent = parent;
    this.data = data;
  }

  render(context, playlists, followers, newss) {
    const { id } = context;
    const responseBody = JSON.parse(this.data);
    if (id === 1) {
      super.render(true);
    } else {
      super.render(false);
    }
    const body = document.getElementById('body');
    body.className = styles.main__background;
    this.parent.className = '';
    const button = new Button({
      templateClass: '',
      text: 'Настройки',
      id: 'settings',
      type: 'submit',
      parent: null,
    });
    const buttonDeleteProfile = new Button({
      templateClass: '',
      text: 'Удалить аккаунт',
      id: 'deleteProfile',
      type: 'submit',
      parent: null,
    });
    const profile = new Profile({
      parent: this.parent,
      isProfile: true,
      body: {
        id: responseBody.id,
        Login: responseBody.login,
        isAuth: true,
        button: button.getTemplate(),
        buttonDelete: buttonDeleteProfile.getTemplate(),
      },
    });
    profile.render();
    const settings = document.getElementById('settings');
    settings.addEventListener('click', () => {
      Bus.emit('Change');
    });
    const deleteUser = document.getElementById('deleteProfile');
    deleteUser.addEventListener('click', () => {
      SessionService.deleteUser().then((res) => {
        super.render(true, 0);
        Bus.emit('DeleteUser', res);
      });
    });

    const createPlaylist = document.createElement('input');
    const headerCreate = document.createElement('span');
    const buttonCreate = new Button({
      classname: '',
      text: 'Создать',
      parent: this.parent,
    });

    const friendList = new FriendList({
      parent: this.parent,
      body: followers,
    });

    const newsLenta = new News({
      parent: this.parent,
      body: newss,
    });
    const lentas = [];
    playlists.forEach((element) => {
      lentas.push(new FilmLenta({
        playlist: true,
        id: element.id,
        genre: element.title,
        body: element.films,
        parent: application,
      }));
    });
    const play = document.getElementById('play');
    const subscribe = document.getElementById('subscribe');
    const news = document.getElementById('lenta');
    this.createRender(buttonCreate, headerCreate, createPlaylist);
    lentas.forEach((element) => {
      element.render();
    });
    let box = this.createBox();
    play.addEventListener('click', (evt) => {
      evt.preventDefault();
      newsLenta.hide();
      friendList.hide();
      this.createHide(buttonCreate, headerCreate, createPlaylist);
      this.createRender(buttonCreate, headerCreate, createPlaylist);
      this.setClass(play, subscribe, news);
      lentas.forEach((element) => {
        element.hide();
      });
      lentas.forEach((element) => {
        element.render();
      });
      box.remove();
      box = this.createBox();
      window.scroll(0, 700);
    });
    subscribe.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.createHide(buttonCreate, headerCreate, createPlaylist);
      friendList.hide();
      newsLenta.hide();
      friendList.render();
      this.setClass(subscribe, play, news);
      lentas.forEach((element) => {
        element.hide();
      });
      box.remove();
      box = this.createBox();
      window.scroll(0, 700);
    });
    news.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.createHide(buttonCreate, headerCreate, createPlaylist);
      friendList.hide();
      this.setClass(news, play, subscribe);
      lentas.forEach((element) => {
        element.hide();
      });
      newsLenta.hide();
      newsLenta.render();
      box.remove();
      box = this.createBox();
      window.scroll(0, 700);
    });
    Bus.on('deletePlaylist', (playlistId) => {
      box.remove();
      lentas.forEach((element) => {
        element.hide();
      });
      let rightIndex = 0;
      lentas.forEach((element, index) => {
        if (element.id === parseInt(playlistId)) {
          rightIndex = index;
        }
      });
      lentas.splice(rightIndex, 1);
      lentas.forEach((element) => {
        element.render();
      });
      box = this.createBox();
      const Note = new Notes({ body: 'Плейлист удалён', parent: application, success: true });
      Note.render();
      const f = function () {
        Note.hide();
      };
      window.setTimeout(f, 2000);
    });
    Bus.on('deleteFilm', (context) => {
      const { filmId, playlistId } = context;
      box.remove();
      let rightIndex = 0;
      lentas.forEach((element) => {
        element.hide();
      });
      lentas.forEach((element, index) => {
        if (element.id === playlistId) {
          rightIndex = index;
        }
      });
      let filmIndex = 0;
      lentas[rightIndex].body.forEach((element, index) => {
        if (element.id === filmId) {
          filmIndex = index;
        }
      });
      lentas[rightIndex].body.splice(filmIndex, 1);
      lentas[rightIndex].posters.splice(filmIndex, 1);
      lentas.forEach((element) => {
        element.render();
      });
      box = this.createBox();
      const Note = new Notes({ body: 'Фильм удален', parent: application, success: true });
      Note.render();
      const f = function () {
        Note.hide();
      };
      window.setTimeout(f, 2000);
    });
    Bus.on('removeFriend', (friendId) => {
      box.remove();
      friendList.remove(friendId);
      friendList.hide();
      friendList.render();
      box = this.createBox();
    });
  }

  createRender(buttonCreate, headerCreate, createPlaylist) {
    headerCreate.textContent = 'Создать плейлист';
    headerCreate.className = styles.headers_main;
    this.parent.appendChild(headerCreate);
    createPlaylist.placeholder = 'Напишите название';
    createPlaylist.className = styles.input_main;
    this.parent.appendChild(createPlaylist);
    buttonCreate.render({
      callback: () => {
        if (createPlaylist.value !== '') {
          Bus.emit('CreatePlaylist', createPlaylist.value);
        } else {
          const fail = new Notes({ body: 'Пустое название!', parent: application, success: false });
          const fFail = function () {
            fail.hide();
          };
          fail.render();
          window.setTimeout(fFail, 2000);
        }
      },
    });
  }

  createHide(buttonCreate, headerCreate, createPlaylist) {
    buttonCreate.hide();
    headerCreate.innerHTML = '';
    createPlaylist.remove();
  }

  setClass(link1, link2, link3) {
    link1.className = stylesProfilePage.profile_nav_links_aBig;
    link2.className = stylesProfilePage.profile_nav_links_a;
    link3.className = stylesProfilePage.profile_nav_links_a;
  }

  createBox() {
    const box = document.createElement('div');
    box.className = styles.invisible_box;
    box.id = 'box';
    this.parent.appendChild(box);
    return box;
  }
}
