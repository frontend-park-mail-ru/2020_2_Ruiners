import OfflineController from './OfflineController.js';
import MenuController from './MenuController.js';
import SignupController from './SignupController.js';
import FilmController from './FilmController.js';
import LoginController from './LoginController.js';
import SettingsController from './SettingsController.js';
import ProfileController from './ProfileController.js';
import PersonController from './PersonController.js';
import GenreController from './GenreController.js';
import PeopleController from './PeopleController';
import SearchController from './SearchController';

export default class Controller {
  static offlinePage() {
    OfflineController();
  }

  static menuPage() {
    MenuController();
  }

  static signupPage() {
    SignupController();
  }

  static filmPage(params) {
    FilmController(params);
  }

  static loginPage() {
    LoginController();
  }

  static profileChengePage() {
    SettingsController();
  }

  static profilePage(params) {
    ProfileController(params);
  }

  static personPage(params) {
    PersonController(params);
  }

  static genrePage(params) {
    GenreController(params);
  }

  static peoplePage(params) {
    PeopleController(params);
  }

  static searchPage() {
    SearchController();
  }
}
