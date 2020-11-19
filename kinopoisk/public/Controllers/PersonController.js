import PersonService from "../Services/personService.js";
import Bus from "../modules/EventBus.js";
import filmService from "../Services/filmService.js";
import PersonPage from "../Views/PersonPage.js";
import {application} from "../config.js";

export default function Person(params) {
    const { id } = params;
    let personBody, filmBody;
    PersonService.getById(id)
        .then((resPerson) => {
            if(resPerson.ok) {
                personBody = resPerson.get;
            } else {
                Bus.emit('redirectMain');
            }
            filmService.getByPerson(id)
                .then((resFilms) => {
                    if(resFilms.ok) {
                        filmBody = resFilms.get;
                    } else {
                        Bus.emit('redirectMain');
                    }
                    const person = new PersonPage({ parent: application, id });
                    person.render({
                        personBody: personBody,
                        filmBody: filmBody,
                    });
                });
        })
}