import {application} from "../config.js";
import sessionService from "../Services/sessionService.js";
import ProfilePage from "../Views/ProfilePage.js";
import filmService from "../Services/filmService";
import Bus from "../modules/EventBus";

export default function Profile(params) {
    let responseBody;
    application.innerHTML = '';
    sessionService.me()
        .then((res) => {
            try {
                responseBody = JSON.stringify(res.get);
            } catch (e) {
                this.menuPage();
                return;
            }
            if (res.ok) {
                filmService.getByGenre('fantasy')
                    .then((res) => {
                        if (res.ok) {
                            let playlists = res.get;
                            const profile = new ProfilePage(application, responseBody);
                            profile.render(params, playlists);
                        } else {
                            Bus.emit('main');
                        }
                    });
            } else {
                this.loginPage();
            }
        });
}