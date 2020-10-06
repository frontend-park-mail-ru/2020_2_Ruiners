import FilmPage from './components/FilmPage/FilmPage.js';
import evtListener from './components/EvtListeners.js';
import Navbar from './components/Navbar.js';

const { ajaxGet, ajaxPost } = globalThis.AjaxModule;
const application = document.getElementById('app');
const nav = document.getElementById('navbar');

const config = {
  menu: {
    href: '/menu',
    text: 'Главная',
    open: menuPage,
  },
  signup: {
    href: '/signup',
    text: 'Зарегистрироваться',
    open: signupPage,
  },
  film: {
    href: '/film',
    text: 'Страница фильма',
    open: filmPage,
  },
  login: {
    href: '/login',
    text: 'Войти',
    open: loginPage,
  },
  profile: {
    href: '/profile',
    text: 'Профиль',
    open: profilePage,
  },
  profileChenge: {
    href: '/profileChenge',
    text: 'Изменить профиль',
    open: profileChengePage,
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

function createNavbar() {
  let responseBody;
  let isAuthorized = false;
  ajaxGet({
    url: '/whois',
    body: null,
    callback: (status, responseText) => {
      responseBody = JSON.parse(responseText);
      if (status === 202) {
        isAuthorized = false;
      } else {
        isAuthorized = true;
      }
      const navbar = new Navbar(responseBody.login, isAuthorized, nav);
      navbar.render(createNavbar, loginPage, signupPage, menuPage);
    },
  });
}

function menuPage() {
  application.innerHTML = '';
  application.className = '';
  const body = document.getElementById('body');
  body.className = '';
  // body.removeChild(form)

  Object.keys(config).forEach((menuKey) => {
    const { href, text } = config[menuKey];
    const menuItem = document.createElement('a');
    menuItem.href = href;
    menuItem.textContent = text;
    menuItem.dataset.section = menuKey;
    application.appendChild(menuItem);
  });
  const signupLink = application.querySelector('[data-section="signup"]');
  const signup = new evtListener(signupLink);
  signup.render(signupPage);
  const filmLink = application.querySelector('[data-section="film"]');
  const film = new evtListener(filmLink);
  film.render(filmPage);
  const loginLink = application.querySelector('[data-section="login"]');
  const login = new evtListener(loginLink);
  login.render(loginPage);
  const profileLink = application.querySelector('[data-section="profile"]');
  const profile = new evtListener(profileLink);
  profile.render(profilePage);
  const profileChengeLink = application.querySelector('[data-section="profileChenge"]');
  const profileChange = new evtListener(profileChengeLink);
  profileChange.render(profileChengePage);
}

function signupPage() {
  application.innerHTML = '';
  const body = document.getElementById('body');
  body.className = 'page';
  const form = document.createElement('form');
  application.className = 'wrapper__form register';
  // form.className = 'wrapper__form register';
  application.appendChild(form);
  const header = document.createElement('h2');
  header.textContent = 'Регистрация';
  header.style = 'color:#FFFFFF; margin-left: 10px';
  form.appendChild(header);
  const loginInput = createInput('login', 'login', 'Логин');
  loginInput.pattern = '[A-Za-z0-9]{5-15}';
  loginInput.required = true;
  const emailInput = createInput('email', 'email', 'e-mail');
  const passwordInput = createInput('password', 'password', 'Пароль');
  passwordInput.pattern = '.{8-16}';
  passwordInput.required = true;
  form.appendChild(loginInput);
  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  const button = document.createElement('button');
  button.href = '/';
  button.textContent = 'Регистрация';
  button.className = 'secondary';
  form.appendChild(button);
  const linkLogin = createA('/login', 'Войти в имеющийся');
  linkLogin.style = 'color: #FFFFFF; margin-left: 10px';
  form.appendChild(linkLogin);
  linkLogin.dataset.section = 'login';
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();
    const email = emailInput.value.trim();
    ajaxPost({
      url: '/signup',
      body: { email, login, password },
      callback: (status, response) => {
        if (status === 200) {
          loginPage();
        } else {
          const { error } = JSON.parse(response);
          alert(error);
        }
      },
    });
  });
}

function filmPage() {
  const film = new FilmPage(application);
  film.render();
}

function loginPage() {
  application.innerHTML = '';
  const body = document.getElementById('body');
  body.className = 'page';
  const form = document.createElement('form');
  application.className = 'wrapper__form login';
  application.appendChild(form);
  const header = document.createElement('h2');
  header.textContent = 'Войти';
  header.style = 'color:#FFFFFF; margin-left: 10px';
  form.appendChild(header);
  const loginInput = createInput('login', 'login', 'Логин или почта');
  const passwordInput = createInput('password', 'password', 'Пароль');
  form.appendChild(loginInput);
  form.appendChild(passwordInput);
  const button = document.createElement('button');
  button.type = 'submit';
  button.textContent = 'Войти';
  button.className = 'secondary';
  form.appendChild(button);
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();
    console.log(`login =  ${login}`);

    ajaxPost({
      url: '/login',
      body: { login, password },
      callback: (status, response) => {
        if (status === 200) {
          nav.innerHTML = '';
          createNavbar();
          menuPage();
        } else if (status === 301) {
          loginPage();
        } else {
          const { error } = JSON.parse(response);
          alert(error);
        }
      },
    });
  });
  const linkSignup = createA('/signup', 'Создать новый');
  linkSignup.style = 'color: #FFFFFF; margin-left: 10px';
  form.appendChild(linkSignup);
  linkSignup.dataset.section = 'signup';
}

function profileChengePage() {
  application.innerHTML = '';
  application.className = '';
  ajaxGet({
    url: '/me',
    body: null,
    callback: (status, responseText) => {
      if (status === 200) {
        const body = document.getElementById('body');
        body.className = 'page';

        const form = document.createElement('form');
        application.className = 'wrapper__form chenge';
        application.appendChild(form);

        const header = document.createElement('h2');
        header.textContent = 'Настройки пользователя';
        header.style = 'color:#FFFFFF; margin-left: 10px';
        form.appendChild(header);
        const responseBody = JSON.parse(responseText);
        const loginInput = createInput('login', 'login', `${responseBody.login}`);
        loginInput.pattern = "/[A-Za-z0-9]{5-15}/";
        loginInput.required = true;
        form.appendChild(loginInput);

        const submitLogin = createInputSubmit('Изменить логин', 'secondary');
        form.appendChild(submitLogin);
        form.addEventListener('submit', (evt) => {
          evt.preventDefault();

          const login = loginInput.value.trim();
          ajaxPost({
            url: '/chengelogin',
            body: { login },
            callback: (status, response) => {
              if (status === 200) {
                nav.innerHTML = '';
                createNavbar();
                profilePage();
              } else {
                const { error } = JSON.parse(response);
                alert(error);
              }
            },
          });
        });
        const formPass = document.createElement('form');
        application.appendChild(formPass);

        const passwordInputOld = createInput('password', 'password', 'Старый пароль');
        passwordInputOld.pattern = '/.{8-16}/';
        passwordInputOld.minlength = 8;
        passwordInputOld.maxlength = 16;
        passwordInputOld.required = true;
        formPass.appendChild(passwordInputOld);

        const passwordInputNew1 = createInput('password', 'password', 'Новый пароль');
        passwordInputNew1.pattern = '/.{8-16}/';
        passwordInputNew1.required = true;
        formPass.appendChild(passwordInputNew1);

        const passwordInputNew2 = createInput('password', 'password', 'Повторите новый пароль');
        passwordInputNew2.pattern = '/.{8-16}/';
        passwordInputNew2.required = true;
        formPass.appendChild(passwordInputNew2);

        const submitpass = createInputSubmit('Изменить пароль', 'secondary');
        formPass.appendChild(submitpass);

        formPass.addEventListener('submit', (evt) => {
          evt.preventDefault();

          const PasswordOld = passwordInputOld.value.trim();
          const Password = passwordInputNew1.value.trim();
          const pass = passwordInputNew2.value.trim();

          console.log(PasswordOld, Password, pass);
          if (Password=== pass) {
            ajaxPost({
              url: '/chengepass',
              body: { PasswordOld, Password },
              callback: (status, response) => {
                if (status === 200) {
                  profilePage();
                } else {
                  const { error } = JSON.parse(response);
                  alert(error);
                }
              },
            });
          }
        });

        const formAvatar = document.createElement('form');
        application.appendChild(formAvatar);

        const imgAvatar = createInput('file', 'file', 'Фото');
        formAvatar.appendChild(imgAvatar);

        imgAvatar.addEventListener('change', (event) => {
          const fileList = event.target.files;
          console.log(fileList);

          files = this.files;

          event.stopPropagation(); // остановка всех текущих JS событий
          event.preventDefault(); // остановка дефолтного события для текущего элемента - клик для <a> тега

          // ничего не делаем если files пустой
          if (typeof files === 'undefined') return;

          // создадим объект данных формы
          const data = new FormData();

          // заполняем объект данных файлами в подходящем для отправки формате
          Object.keys(files).forEach((key, value) => {
            data.append(key, value);
          });

          // добавим переменную для идентификации запроса
          data.append('my_file_upload', 1);

          // AJAX запрос
          ajaxPost({
            url: './chengeavatar',
            type: 'POST', // важно!
            data,
            cache: false,
            dataType: 'json',
            // отключаем обработку передаваемых данных, пусть передаются как есть
            processData: false,
            // отключаем установку заголовка типа запроса. Так jQuery скажет серверу что это строковой запрос
            contentType: false,
            // функция успешного ответа сервера
            success(respond, status, jqXHR) {
            // ОК - файлы загружены
              if (typeof respond.error === 'undefined') {
                profilePage();
              }
              // ошибка
              else {
                console.log(`ОШИБКА: ${respond.data}`);
              }
            },
            // функция ошибки ответа сервера
            error(jqXHR, status, errorThrown) {
              console.log(`ОШИБКА AJAX запроса: ${status}`, jqXHR);
            },

          });
        });

        // const submitAvatar = createInputSubmit('Изменить аватар', 'secondary');
        // formAvatar.appendChild(submitAvatar);

        // formPass.addEventListener('submit', (evt) => {
        //   evt.preventDefault();

        //   const img = imgAvatar.value;/// &&&

        //   ajax(
        //     'POST',
        //     '/chengeavatar',
        //     { img },
        //     (status, response) => {
        //       if (status === 200) {
        //         profilePage();
        //       } else {
        //         const { error } = JSON.parse(response);
        //         alert(error);
        //       }
        //     },
        //   );
        // });

        const buttonBack = document.createElement('button');
        buttonBack.href = '/';
        buttonBack.textContent = 'Назад';
        buttonBack.className = 'secondary';
        buttonBack.dataset.section = 'profile';
        buttonBack.addEventListener('click', (evt) => {
          evt.preventDefault();

          profilePage();
        });
        application.appendChild(buttonBack);
      } else {
        alert('АХТУНГ, нет авторизации');
        loginPage();
      }
    },
  });
}

function profilePage() {
  application.innerHTML = '';
  application.className = '';
  ajaxGet({
    url: '/me',
    body: null,
    callback: (status, responseText) => {
      if (status === 200) {
        const body = document.getElementById('body');
        body.className = 'page';
        const divshadow = createDiv('shadow profile', application);

        const ul = document.createElement('ul');
        ul.className = 'top-menu';
        divshadow.appendChild(ul);

        const menuItem0 = document.createElement('li');
        const menuItema0 = document.createElement('span');

        menuItema0.textContent = 'Профиль';

        menuItem0.appendChild(menuItema0);
        ul.appendChild(menuItem0);

        Object.keys(menuTop).forEach((menuKey) => {
          const { href, text } = menuTop[menuKey];
          const menuItem = document.createElement('li');
          const menuItema = createA(href, text);
          menuItema.dataset.section = menuKey;
          menuItem.appendChild(menuItema);
          ul.appendChild(menuItem);
        });

        const divLeft = createDiv('profileInfoWrapLeft', divshadow);
        const divAvatar = createDiv('avatarUserBoxP', divLeft);

        const img = document.createElement('img');
        img.src = '/static/static/images/user-no-big.gif';
        divAvatar.appendChild(img);

        const button = document.createElement('button');
        button.className = 'secondary';
        button.textContent = 'Изменить данные';
        button.href = '/';
        button.dataset.section = 'profileChenge';
        divLeft.appendChild(button);

        const divRight = createDiv('profileInfoWrapRight', divshadow);
        const divInfo = createDiv('infoUser', divRight);

        const nick = document.createElement('h1');
        nick.className = 'nick_name';

        const responseBody = JSON.parse(responseText);
        nick.textContent = `${responseBody.login}`;

        divInfo.appendChild(nick);

        const divInfoAuth = createDiv('infoUserAuth', divRight);

        const span1 = document.createElement('span');
        span1.textContent = 'Регистрация: 11 марта 2020';
        divInfoAuth.appendChild(span1);

        const span2 = document.createElement('span');
        span2.textContent = 'Рейтинг комментариев:';
        divInfoAuth.appendChild(span2);
      } else {
        alert('АХТУНГ, нет авторизации');
        loginPage();
      }
    },
  });
}

createNavbar();
menuPage();
