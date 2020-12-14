import Controller from './Controllers/Controllers.js';
import Bus from './modules/EventBus.js';
import Router from './modules/Router.js';
import styles from './static/CSS/main.scss';
import './static/images/icons8-кинопроектор-96.png';
import './static/images/login.jpg';
import './static/images/offline.png';
import './static/images/adding.png';
import './static/images/search1.png';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import RateAndReviewService from './Services/rateAndReviewService.js';
import { application, nav } from './config.js';
import subscribeService from './Services/subscribeService';

application.style.marginLeft = '10vmin';

if ('serviceWorker' in navigator) {
  runtime.register();
}

Bus.on('profile', (href) => {
  href.render('click', () => {
    router.open('/profile');
  });
});

Bus.on('profileChange', (href) => {
  href.render('click', () => {
    router.open('/profileChange');
  });
});

Bus.on('film', (href) => {
  href.render('click', () => {
    router.open('/film', {
      id: 1,
    });
  });
});

Bus.on('navbarLogin', (button) => {
  button.render({
    callback: () => {
      router.open('/login');
    },
  });
});

Bus.on('GoFilm', (id) => {
  router.open('/film', { id: id });
});

Bus.on('navbarSignup', (button) => {
  button.render({
    callback: () => {
      router.open('/signup');
    },
  });
});

Bus.on('logout', (res) => {
  if (res.ok) {
    router.open('/');
  } else {
    console.log(res.errmsg);
  }
});

Bus.on('navbarClick', (mainLink) => {
  mainLink.render('click', () => {
  });
});

Bus.on('loginSignup', (data) => {
  const {
    loginres, err, form,
  } = data;
  if (loginres.ok) {
    nav.innerHTML = '';
    router.open('/');
  } else {
    err.innerHTML = loginres.errmsg;
    form.appendChild(err);
  }
});

Bus.on('Rate', (context) => {
  const {
    id, index, err, card,
  } = context;
  RateAndReviewService.Rate(id, index)
    .then((res) => {
      if (res.ok) {
        err.textContent = 'Вы успешно проголосовали!';
        card.appendChild(err);
      }
    });
});

Bus.on('loginPasswordChange', (button) => {
  router.open('/profile');
});

Bus.on('ProfilePage', () => {
  router.open('/profile', { id: 1 });
});

Bus.on('Change', (res) => {
  router.open('/profileChange');
});

Bus.on('Back', (button) => {
  button.render({
    callback: () => {
      window.history.back();
    },
  });
});

Bus.on('redirectMain', () => {
  router.open('/');
});

const body = document.getElementById('body');
const router = new Router(body);

if (navigator.onLine) {
  router
    .register('/', Controller.menuPage)
    .register('/login', Controller.loginPage)
    .register('/film', Controller.filmPage)
    .register('/signup', Controller.signupPage)
    .register('/profile', Controller.profilePage)
    .register('/profileChange', Controller.profileChengePage)
    .register('/person', Controller.personPage)
    .register('/genre', Controller.genrePage)
    .register('/people', Controller.peoplePage)
    .register('/search', Controller.searchPage);
} else {
  router.register('/', Controller.offlinePage);
}

router.start();

window.addEventListener('click', (evt) => {
  if (evt.target.id.indexOf('playlist') === -1 && evt.target.id.indexOf('poster') === -1 && evt.target.id.indexOf('profile') === -1) {

  } else if (evt.target.id.indexOf('playlist') !== -1 || evt.target.id.indexOf('poster') !== -1) {
    evt.preventDefault();
    Bus.emitLast('Delete', evt.target.id);
  } else {
    evt.preventDefault();
    Bus.emitLast('unsubscribeList', evt.target.id);
  }
});
