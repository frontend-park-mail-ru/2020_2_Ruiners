import Bus from '../modules/EventBus.js';
import sessionService from '../Services/sessionService.js';
import LoginPage from '../Views/LoginPage/LoginPage.js';
import { application } from '../config.js';

export default function Login() {
  Bus.on('Login', (context) => {
    const {
      button, formrLogin, err, form,
    } = context;
    button.render({
      callback: () => {
        const login = formrLogin[1].value.trim();
        const password = formrLogin[2].value.trim();
        sessionService.login(login, password).then((loginres) => {
          Bus.emit('loginSignup', {
            loginres,
            err,
            form,
          });
        });
      },
    });
  });
  sessionService.me()
    .then((res) => {
      if (res.ok) {
        Bus.emit('main');
      } else {
        const login = new LoginPage(application);
        login.render();
      }
    });
}
