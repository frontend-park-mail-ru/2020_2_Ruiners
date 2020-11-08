import Base from './Base.js';
import PersonCard from "../Components/PersonCard/PersonCard.js";
import filmService from "../Services/filmService.js";
import FilmLenta from "../Components/FilmLenta/FilmLenta.js";
import PersonService from "../Services/personService.js";
import Bus from "../Services/EventBus.js";

export default class PersonPage extends Base{

    constructor(context) {
        super(nav);
        const { parent, id } = context;
        this.parent = parent;
        this.id = id;
    }

    render() {
        super.render(false);
        const app = document.getElementById('body')
        app.className = 'film1';
        this.parent.innerHTML = '';
        let responseBody;
        PersonService.getById(this.id)
            .then((res) => {
                try {
                    responseBody = JSON.parse(JSON.stringify(res.get));
                } catch (e) {
                    Bus.emit('main');
                    return;
                }
                if (res.ok) {
                    const person = new PersonCard({ parent: this.parent, body: responseBody });
                    person.render();
                } else {
                    this.menuPage();
                }
                filmService.getByPerson(this.id)
                    .then((res) => {
                        let responseBody;
                        try {
                            responseBody = JSON.parse(JSON.stringify(res.get));
                        } catch (e) {
                            Bus.emit('main');
                            return;
                        }
                        if (res.ok) {
                            console.log(responseBody)
                            const lenta = new FilmLenta({
                                genre: 'Фильмы с участием этого актера',
                                body: responseBody,
                                parent: application
                            });
                            lenta.render();
                        } else {
                            this.menuPage();
                        }
                    });
            });

    }
}
