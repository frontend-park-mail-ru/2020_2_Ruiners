import Base from './Base.js';
import {application, domain, nav} from "../config.js";
import Button from "../Components/Button/Button";
import Profile from "../Components/Profile/Profile.js";
import Bus from "../modules/EventBus.js";
import FilmLenta from "../Components/FilmLenta/FilmLenta";
import FriendList from "../Components/FriendList/FriendList";

export default class ProfilePage extends Base {
  constructor(parent, data) {
    super(nav);
    this.parent = parent;
    this.data = data;
  }

  render(context, playlists) {
    const { id } = context
    const responseBody = JSON.parse(this.data);
    if(id === 1) {
      super.render(true);
    } else {
      super.render(false);
    }
    const body = document.getElementById('body');
    body.className = 'main__background';
    this.parent.className = '';
    const button = new Button({
      classname: 'buttons__forComments',
      parent: null,
    })
    const profile = new Profile({
        parent: this.parent,
        isProfile: true,
        body: {
          id: responseBody.id,
          Login: responseBody.Login,
          isAuth: true,
          button: button.template({
            classname: '',
            text: 'Настройки',
            id: 'settings',
            type: 'submit',
          })
        }
    });
    profile.render();
    const settings = document.getElementById('settings');
    settings.addEventListener('click', () => {
      Bus.emit('Change');
    });

    const createPlaylist = document.createElement('input');
    const headerCreate = document.createElement('span');
    const buttonCreate = new Button({
      classname: '',
      text: 'Создать',
      parent: this.parent,
    });
    const friends = [
      {
        id: "55",
        login: "Suchka",
      },
      {
        id: "56",
        login: "Arkadiy",
      }
    ];                // Убрать
    const friendList = new FriendList({
      parent: this.parent,
      body: friends,
    });
    let lentas = []
    playlists.forEach(element => {
        lentas.push(new FilmLenta({
            playlist: true,
            id: element.Id,
            genre: element.Title,
            body: element.Films,
            parent: application
        }));
    })
    let play = document.getElementById('play');
    let subscribe = document.getElementById('subscribe');
    let news = document.getElementById('lenta');
    this.createRender(buttonCreate, headerCreate, createPlaylist);
    lentas.forEach(element => {
        element.render();
    })
    let box = this.createBox();
    play.addEventListener('click', (evt) => {
      evt.preventDefault();
      friendList.hide();
      this.createHide(buttonCreate, headerCreate, createPlaylist);
      this.createRender(buttonCreate, headerCreate, createPlaylist);
      this.setClass(play, subscribe, news);
      lentas.forEach(element => {
          element.hide();
      });
        lentas.forEach(element => {
            element.render();
        });
      box.remove();
      box = this.createBox();
      window.scroll(0, 700)
    });
    subscribe.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.createHide(buttonCreate, headerCreate, createPlaylist);
      friendList.hide();
      friendList.render();
      this.setClass(subscribe, play, news);
        lentas.forEach(element => {
            element.hide();
        });
      box.remove();
      box = this.createBox();
      window.scroll(0, 700)
    });
    news.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.createHide(buttonCreate, headerCreate, createPlaylist);
      friendList.hide();
      this.setClass(news, play, subscribe);
        lentas.forEach(element => {
            element.hide();
        });
      box.remove();
      box = this.createBox();
      window.scroll(0, 700)
    });
  }

  createRender(buttonCreate, headerCreate, createPlaylist) {
    headerCreate.textContent = 'Создать плейлист';
    headerCreate.className = 'headers_main';
    this.parent.appendChild(headerCreate);
    createPlaylist.placeholder = 'Напишите название';
    createPlaylist.className = 'input_main';
    this.parent.appendChild(createPlaylist);
    buttonCreate.render({
      callback: () => {
        if(createPlaylist.value !== '') {
          Bus.emit('CreatePlaylist', createPlaylist.value);
        }
      }
    });
  }

  createHide(buttonCreate, headerCreate, createPlaylist) {
    buttonCreate.hide();
    headerCreate.innerHTML = '';
    createPlaylist.remove();
  }

  setClass(link1, link2, link3) {
    link1.className = 'profile_nav_links_aBig';
    link2.className = 'profile_nav_links_a';
    link3.className = 'profile_nav_links_a';
  }

  createBox() {
    const box = document.createElement('div');
    box.className = 'invisible_box';
    box.id = 'box';
    this.parent.appendChild(box);
    return box;
  }

}
