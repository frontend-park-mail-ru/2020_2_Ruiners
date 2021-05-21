import Bus from '../modules/EventBus';
import PeoplePage from '../Views/PeoplePage/PeoplePage';
import { application } from '../config';
import sessionService from '../Services/sessionService.js';
import ProfileController from './ProfileController';
import subscribeService from '../Services/subscribeService';

export default function People(params) {
  const { id } = params;
  subscribeService.getCheck(id).then((resIsSub) => {
    subscribeService.getLogin(id).then((resLogin) => {
      sessionService.me()
        .then((res) => {
          let responseBody;
          responseBody = resLogin.get;
          if (resIsSub.ok) {
            responseBody.isSub = resIsSub.get.check;
          } else {
            responseBody.isSub = false;
          }
          if (res.ok) {
            console.log(res.get.id, id);
            if (res.get.id == id) {
              console.log(res.get.id, id);
              ProfileController({ id });
              return;
            }
            responseBody.isAuth = true;
          } else {
            responseBody.isAuth = false;
          }
          const people = new PeoplePage(application, responseBody);
          people.render(id);
        });
    });
  });
  Bus.on('subscribe', (data) => {
    let {id, unsubscribe, par} = data;
    subscribeService.PostFollow(id).then((res) => {
      if (res.ok) {
        par.appendChild(unsubscribe);
        console.log('follow');
      }
    });
  });
  Bus.on('unsubscribe', (data) => {
    let {id, unsubscribe, par} = data;
    subscribeService.PostUnfollow(id).then((res) => {
      if (res.ok) {
        par.appendChild(unsubscribe);
        console.log('unfollow');
      }
    });
  });
}
