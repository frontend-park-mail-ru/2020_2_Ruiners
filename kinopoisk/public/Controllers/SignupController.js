import Bus from '../modules/EventBus.js';
import sessionService from '../Services/sessionService.js';
import SignupPage from '../Views/SignupPage/SignupPage.js';
import { application } from '../config.js';

export default function Signup() {
  Bus.on('Signup', (context) => {
    const {
      button, formrLogin, err, form,
    } = context;
    button.render({
      callback: () => {
        if (!formrLogin[1].classList.contains('invalid')
                    && !formrLogin[3].classList.contains('invalid')) {
          const login = formrLogin[1].value.trim();
          const password = formrLogin[3].value.trim();
          const email = formrLogin[2].value.trim();
          sessionService.signup(login, email, password).then((signupres) => {
            Bus.emit('loginSignup', {
              loginres: signupres,
              err,
              form,
            });
          });
        }
      },
    });
  });
  sessionService.me()
    .then((res) => {
      if (res.ok) {
        Bus.emit('main');
      } else {
        const signup = new SignupPage(application);
        signup.render();
      }
    });
}
