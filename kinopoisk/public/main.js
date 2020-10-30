import Controller from "./Controllers/Controllers.js";
import Bus from "./Services/EventBus.js";
import Router from "./Services/Router.js";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', {scope: '/'})
        .then((registration) => {
            console.log('sw registration on scope:', registration.scope);
        })
        .catch((err) => {
            console.error(err);
        });
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
    button.render(() => {
        router.open('/login');
    });
});

Bus.on('navbarSignup', (button) => {
    button.render(() => {
        router.open('/signup');
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
    const { loginres, err, form } = data;
    if (loginres.ok) {
        nav.innerHTML = '';
        router.open('/');
    } else {
        err.innerHTML = loginres.errmsg;
        form.appendChild(err);
    }
});

Bus.on('loginPasswordChange', (res) => {
    router.open('/profile');
});
Bus.on('Change', (res) => {
    router.open('/profileChange');
});

Bus.on('Back', button => {
    button.render(() => {
        window.history.back();
    })
});

const body = document.getElementById('body');
const router = new Router(body);

router
    .register('/', Controller.menuPage)
    .register('/login', Controller.loginPage)
    .register('/film', Controller.filmPage)
    .register('/signup', Controller.signupPage)
    .register('/profile', Controller.profilePage)
    .register('/profileChange', Controller.profileChengePage);


router.start();



