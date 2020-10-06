const {ajaxGet, ajaxPost} = globalThis.AjaxModule;
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

function createLi(className, child) {
  const li = document.createElement('li');
  li.className = className;
  li.appendChild(child);
  return li;
}

function createA(href, text) {
  const a = document.createElement('a');
  a.href = href;
  a.textContent = text;
  return a;
}

function createSpan(classname, text) {
  const span = document.createElement('span');
  span.className = classname;
  span.textContent = text;
  return span;
}

function createInput(type, name, text) {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.placeholder = text;
  return input;
}

function createInputSubmit(value, className) {
  const input = document.createElement('input');
  input.type = 'submit';
  input.className = className;
  input.value = value;
  return input;
}

function createDiv(cla, child) {
  const div = document.createElement('div');
  div.className = cla;

  child.appendChild(div);
  return div;
}

function createNavbar() {
  let responseBody;
  let isAuthorized = false;
  ajaxGet({ url: '/whois', body: null, callback: (status, responseText) => {
      responseBody = JSON.parse(responseText);
      if (responseBody.login === 'null') {
        isAuthorized = false;
      } else {
        isAuthorized = true;
      }
      console.log(isAuthorized);
      const navbar = document.createElement('nav');
      nav.appendChild(navbar);
      const ul = document.createElement('ul');
      ul.className = 'menu-main';
      navbar.appendChild(ul);
      const kinopoisk = createA('/menu', 'Kinopoisk.ru');
      kinopoisk.dataset.section = 'menu';
      const films = createA('/', 'Фильмы');
      const search = createA('/', 'Поиск');
      const login = document.createElement('button');
      const signup = document.createElement('button');
      login.textContent = 'Войти';
      signup.textContent = 'Зарегистрироваться';
      const li1 = createLi('brand', kinopoisk);
      const li2 = createLi('menu-secondary', films);
      const li3 = createLi('menu-secondary', search);
      ul.appendChild(li1);
      ul.appendChild(li2);
      ul.appendChild(li3);
      if (!isAuthorized) {
        const li4 = createLi('menu-buttons', login);
        const li5 = createLi('menu-buttons', signup);
        ul.appendChild(li4);
        ul.appendChild(li5);
      } else {
        const logout = document.createElement('button');
        logout.textContent = 'Выйти';
        const li34 = createLi('menu-buttons', logout);
        const profile = document.createElement('button');
        profile.textContent = `${responseBody.login}`;
        const li33 = createLi('menu-buttons', profile);
        ul.appendChild(li33);
        ul.appendChild(li34);
        logout.addEventListener('click', (evt) => {
          evt.preventDefault();
          ajaxGet({
            url: '/logout',
            body: null,
            callback: (status, response) => {
              if (status === 200) {
                nav.innerHTML = '';
                createNavbar();
                loginPage();
              } else {
                alert('error');
              }
            },
          });
        });
      }
      // login.addEventListener('click', (event) => {
      //     event.preventDefault();
      //     application.innerHTML = '';
      //     loginPage();
      // });
      // signup.addEventListener('click', (event) => {
      //     event.preventDefault();
      //     application.innerHTML = '';
      //     signupPage();
      // });
      login.dataset.section = 'login';
      signup.dataset.section = 'signup';
    }});
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
  signupLink.addEventListener('click', ((evt) => {
    evt.preventDefault();
    signupPage();
  }));
  const filmLink = application.querySelector('[data-section="film"]');
  filmLink.addEventListener('click', ((evt) => {
    evt.preventDefault();
    filmPage();
  }));
  const loginLink = application.querySelector('[data-section="login"]');
  loginLink.addEventListener('click', ((evt) => {
    evt.preventDefault();
    loginPage();
  }));
  const profileLink = application.querySelector('[data-section="profile"]');
  profileLink.addEventListener('click', ((evt) => {
    evt.preventDefault();
    profilePage();
  }));
  const profileChengeLink = application.querySelector('[data-section="profileChenge"]');
  profileChengeLink.addEventListener('click', ((evt) => {
    evt.preventDefault();
    profileChengePage();
  }));
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
  const emailInput = createInput('email', 'email', 'e-mail');
  const passwordInput = createInput('password', 'password', 'Пароль');
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
      body: {email, login, password},
      callback: (status, response) => {
        if (status === 200) {
          loginPage();
        } else {
          const {error} = JSON.parse(response);
          alert(error);
        }
      },
    });
  });
}

function filmPage() {
  const body = document.getElementById('body');
  body.className = 'film1';
  application.innerHTML = '';
  application.className = '';
  application.className = '';
  const main = document.createElement('div');
  main.className = 'main';
  application.appendChild(main);
  const ul1 = document.createElement('ul');
  main.appendChild(ul1);
  const li1 = document.createElement('li');
  ul1.appendChild(li1);
  const h1 = document.createElement('h1');
  h1.textContent = 'Начало';
  li1.appendChild(h1);
  const li2 = document.createElement('li');
  ul1.appendChild(li2);
  const rating = document.createElement('div');
  rating.className = 'rating';
  li2.appendChild(rating);
  const h11 = document.createElement('h1');
  rating.appendChild(h11);
  const span = createSpan('colour-text1', '8,7');
  const span1 = createSpan('colour-text2', '110k');
  h11.appendChild(span);
  h11.appendChild(span1);
  const rate = document.createElement('button');
  rate.textContent = 'Оценить';
  rating.appendChild(rate);
  const ul2 = document.createElement('ul');
  main.appendChild(ul2);
  const li3 = document.createElement('li');
  ul2.appendChild(li3);
  const frame = document.createElement('iframe');
  frame.width = '560';
  frame.height = '315';
  frame.src = 'https://www.youtube.com/embed/85Zz1CCXyDI';
  frame.frameborder = '1';
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  frame.allowFullscreen = true;
  li3.appendChild(frame);
  const film = document.createElement('div');
  film.className = 'film';
  ul2.appendChild(film);
  const p = document.createElement('p');
  p.textContent = 'О фильме';
  film.appendChild(p);
  const span2 = createSpan('colour-text3', 'Год: 2010');
  const span3 = createSpan('colour-text3', 'Страна: США, Великобритания');
  const span4 = createSpan('colour-text3', 'Режиссер: Кристофер Ноллан');
  p.appendChild(span2);
  p.appendChild(span3);
  p.appendChild(span4);
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
      body: {login, password},
      callback: (status, response) => {
        if (status === 200) {
          nav.innerHTML = '';
          createNavbar();
          menuPage();
        } else if (status === 301) {
          loginPage();
        } else {
          const {error} = JSON.parse(response);
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
  ajaxGet({ url: '/me', body: null, callback: (status, responseText) => {
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
      loginInput.required = true;
      form.appendChild(loginInput);

      const submitLogin = createInputSubmit('Изменить логин', 'secondary');
      form.appendChild(submitLogin);
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const login = loginInput.value.trim();
        ajaxPost({
          url: '/chengelogin',
          body: {login},
          callback: (status, response) => {
            if (status === 200) {
              nav.innerHTML = ''
              createNavbar()
              profilePage();
            } else {
              const {error} = JSON.parse(response);
              alert(error);
            }
          },
        });
      });
      const formPass = document.createElement('form');
      application.appendChild(formPass);

      const passwordInputOld = createInput('password', 'password', 'Старый пароль');
      passwordInputOld.required = true;
      formPass.appendChild(passwordInputOld);

      const passwordInputNew1 = createInput('password', 'password', 'Новый пароль');
      passwordInputNew1.required = true;
      formPass.appendChild(passwordInputNew1);

      const passwordInputNew2 = createInput('password', 'password', 'Повторите новый пароль');
      passwordInputNew2.required = true;
      formPass.appendChild(passwordInputNew2);

      const submitpass = createInputSubmit('Изменить пароль', 'secondary');
      formPass.appendChild(submitpass);

      formPass.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const pass0 = passwordInputOld.value.trim();
        const pass1 = passwordInputNew1.value.trim();
        const pass2 = passwordInputNew2.value.trim();
        console.log(pass0 + pass1 + pass2);
        ajaxPost({
          url: '/chengepass',
          body: {pass0, pass1},
          callback: (status, response) => {
            if (status === 200) {
              profilePage();
            } else {
              const {error} = JSON.parse(response);
              alert(error);
            }
          },
        });
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
  }});
}

function profilePage() {
  application.innerHTML = '';
  application.className = '';
  ajaxGet({url: '/me', body: null, callback: (status, responseText) => {
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
    }});
}

nav.addEventListener('click', (evt) => {
  const { target } = evt;

  if (target instanceof HTMLAnchorElement) {
    evt.preventDefault();
    config[target.dataset.section].open();
  }

  if (target instanceof HTMLButtonElement) {
    evt.preventDefault();
    config[target.dataset.section].open();
  }
});

createNavbar();
menuPage();

