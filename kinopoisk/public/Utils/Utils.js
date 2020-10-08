const application = document.getElementById('app');
const nav = document.getElementById('navbar');
const noop = () => {};
const { ajaxGetUsingFetch, ajaxPostUsingFetch } = globalThis.AjaxModule;

const config = {
  signup: {
    href: '/signup',
    text: 'Зарегистрироваться',
  },
  film: {
    href: '/film',
    text: 'Страница фильма',
  },
  login: {
    href: '/login',
    text: 'Войти',
  },
  profile: {
    href: '/profile',
    text: 'Профиль',
  },
  profileChenge: {
    href: '/profileChenge',
    text: 'Изменить профиль',
  },
};

const menuTop = {
  rech: {
    href: '/rech',
    text: 'Рецензии',
  },
  mark: {
    href: '/mark',
    text: 'Оценки',
  },
  films: {
    href: '/films',
    text: 'Фильмы',
  },
  stars: {
    href: '/stars',
    text: 'Звёзды',
  },
};
