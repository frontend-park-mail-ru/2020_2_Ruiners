import Bus from "../modules/EventBus";
import PeoplePage from "../Views/PeoplePage";
import {application} from "../config";
import sessionService from "../Services/sessionService.js";
import ProfileController from "./ProfileController";

export default function People(params) {
    const  { id } = params;
    const responseBody = { Login: 'ErikDoter', id: id};
    sessionService.me()
        .then((res) => {
            if(res.ok) {
                if(res.get.id == id) {
                    ProfileController({id: id});
                    return;
                }
                responseBody.isAuth = true;
            } else {
                responseBody.isAuth = false;
            }
            const people = new PeoplePage(application, responseBody);
            people.render();
        });
}