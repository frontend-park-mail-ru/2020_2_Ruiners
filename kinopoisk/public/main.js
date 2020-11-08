import Controller from "./Controllers/Controllers.js";
import Bus from "./Services/EventBus.js";
import Router from "./Services/Router.js";
import './static/CSS/main.css'
import  './static/images/icons8-кинопроектор-96.png'
import './static/images/login.jpg'

const application = document.getElementById('app');
const nav = document.getElementById('navbar');
window.application = application;
window.nav = nav;

if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then();
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
    const { loginres, err, form, render } = data;
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

Bus.on('main', () => {
    router.open('main');
})

const body = document.getElementById('body');
const router = new Router(body);

if(navigator.onLine) {
    router
        .register('/', Controller.menuPage)
        .register('/login', Controller.loginPage)
        .register('/film', Controller.filmPage)
        .register('/signup', Controller.signupPage)
        .register('/profile', Controller.profilePage)
        .register('/profileChange', Controller.profileChengePage)
        .register('/person', Controller.personPage)
        .register('/genre', Controller.genrePage);
} else {
    router.register('/', Controller.offlinePage)
}


router.start();



