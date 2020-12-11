import profileT from './Profile.handlebars';
import { domain } from '../../config.js';
import styles from './Profile.scss';

export default class Profile {
  constructor(context = {}) {
    const {
      body, parent, isProfile,
    } = context;
    this.profile = document.createElement('div');
    this.parent = parent;
    this.body = body;
    this.isProfile = isProfile;
    this.template = profileT;
  }

  render() {
    this.parent.appendChild(this.profile);
    this.profile.innerHTML = this.template({
      styles: styles,
      isProfile: this.isProfile,
      id: this.body.id,
      Login: this.body.Login,
      isAuth: this.body.isAuth,
      isSub: this.body.isSub,
      button: this.body.button,
      buttonSub: this.body.buttonSub,
      buttonUnsub: this.body.buttonUnsub,
      domain,
      random: Math.random(),
    });
  }
}
