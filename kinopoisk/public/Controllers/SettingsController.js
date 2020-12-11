import { application } from '../config.js';
import Bus from '../modules/EventBus.js';
import userService from '../Services/userService.js';
import sessionService from '../Services/sessionService.js';
import ProfileChangePage from '../Views/ProfileChangePage.js';
import styles from '../static/CSS/main.scss';

export default function Settings() {
  let responseBody;
  application.innerHTML = '';
  Bus.on('Save', (context) => {
    const {
      buttonSave, form, formPass, formData, formAvatar, formrLogin, formr, formrAvatar, base,
    } = context;
    const err = document.createElement('div');
    buttonSave.render({
      callback: () => {
        let login; let PasswordOld; let Password; let
          pass;
        if (!formrLogin[1].classList.contains('invalid')) {
          login = formrLogin[1].value.trim();
        }
        if (!formr[2].classList.contains('invalid')
                    || !formr[3].classList.contains('invalid')) {
          PasswordOld = formr[1].value.trim();
          Password = formr[2].value.trim();
          pass = formr[3].value.trim();
        }
        if (Password === pass) {
          formData.append('file', formrAvatar[1].files[0]);
          userService.Change(login, PasswordOld, Password, formData).then((res) => {
            if (res.ok) {
              Bus.emit('ProfilePage');
            } else {
              console.log(res.errmsg);
              err.innerHTML = res.errmsg;
              err.className = styles.error;
              formAvatar.appendChild(err);
            }
          });
        } else {
          err.innerHTML = 'Пароли не совпадают';
          err.className = styles.error;
          formPass.appendChild(err);
        }
      },
    });
  });
  sessionService.me()
    .then((res) => {
      try {
        responseBody = JSON.stringify(res.get);
      } catch (e) {
        this.menuPage();
        return;
      }
      if (res.ok) {
        const profileChange = new ProfileChangePage(application, responseBody);
        profileChange.render();
      } else {
        this.loginPage();
      }
    });
}
