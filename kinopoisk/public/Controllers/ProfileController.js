import {application} from "../config.js";
import sessionService from "../Services/sessionService.js";
import ProfilePage from "../Views/ProfilePage.js";

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
                const profile = new ProfilePage(application, responseBody);
                profile.render(params);
            } else {
                this.loginPage();
            }
        });
}