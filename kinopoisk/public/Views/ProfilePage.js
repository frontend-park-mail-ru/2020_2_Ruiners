import Base from './Base.js';
import {application, domain, nav} from "../config.js";
import Button from "../Components/Button/Button";
import Profile from "../Components/Profile/Profile.js";
import Bus from "../modules/EventBus";
import FilmLenta from "../Components/FilmLenta/FilmLenta";

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
        body: {
          id: responseBody.id,
          Login: responseBody.Login,
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
    const lenta = new FilmLenta({
      genre: 'Посмотреть позже',
      body: playlists,
      parent: application
    });
    let play = document.getElementById('play');
    let subscribe = document.getElementById('subscribe');
    let history = document.getElementById('history');
    let historyWatch = document.getElementById('history_watch')
    lenta.render();
    let box = this.createBox();
    play.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.setClass(play, subscribe, history, historyWatch);
      lenta.hide();
      lenta.render();
      box.remove();
      box = this.createBox();
      window.scroll(0, 700)
    });
    subscribe.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.setClass(subscribe, play, historyWatch, history);
      lenta.hide();
      box.remove();
      box = this.createBox();
      window.scroll(0, 700)
    });
    history.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.setClass(history, play, subscribe, historyWatch);
      lenta.hide();
      box.remove();
      box = this.createBox();
      window.scroll(0, 700)
    });
    historyWatch.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.setClass(historyWatch, play, subscribe, history);
      lenta.hide();
      box.remove();
      box = this.createBox();
      window.scroll(0, 700)
    });
  }

  setClass(link1, link2, link3, link4) {
    link1.className = 'profile_nav_links_aBig';
    link2.className = 'profile_nav_links_a';
    link3.className = 'profile_nav_links_a';
    link4.className = 'profile_nav_links_a';
  }

  createBox() {
    const box = document.createElement('div');
    box.className = 'invisible_box';
    box.id = 'box';
    this.parent.appendChild(box);
    return box;
  }

}
