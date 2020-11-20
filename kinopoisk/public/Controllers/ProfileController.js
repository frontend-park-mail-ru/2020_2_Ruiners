import {application} from "../config.js";
import sessionService from "../Services/sessionService.js";
import ProfilePage from "../Views/ProfilePage.js";
import Bus from "../modules/EventBus";
import PlaylistService from "../Services/playlistService.js";

export default function Profile(params) {
    let responseBody;
    application.innerHTML = '';
    Bus.on('CreatePlaylist', (title) => {
        console.log(title);
       PlaylistService.PostCreate(title).then( res => {
           if(res.ok) {
               Bus.emit('ProfilePage');
           }
       })
    });
    sessionService.me()
        .then((res) => {
            try {
                responseBody = JSON.stringify(res.get);
            } catch (e) {
                this.menuPage();
                return;
            }
            if (res.ok) {
                PlaylistService.getPlaylistFilms()
                    .then((res) => {
                        if (res.ok) {
                            let playlists = res.get;
                            const profile = new ProfilePage(application, responseBody);
                            console.log(playlists);
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