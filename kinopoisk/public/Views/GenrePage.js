import Base from "./Base.js";
import filmService from "../Services/filmService.js";
import FilmLenta from "../Components/FilmLenta/FilmLenta.js";
import Bus from "../Services/EventBus.js";


export default class LoginPage extends Base{

    constructor(context) {
        const { parent, genre } = context;
        super(nav);
        this.parent = parent;
        this.genre = genre;
        this.map = [];
        this.map['fantasy'] = 'Фантастика';
        this.map['comedy'] = 'Комедии';
    }

    render() {
        super.render(false);
        this.parent.innerHTML = '';
        const body = document.getElementById('body');
        body.className = 'page';
        let responseBody;
        filmService.getByGenre(this.genre)
            .then((res) => {
                try {
                    responseBody = JSON.parse(JSON.stringify(res.get));
                } catch (e) {
                    Bus.emit('main');
                    return;
                }
                if (res.ok) {
                    const lenta = new FilmLenta({
                        genre: this.getRussian(this.genre),
                        body: responseBody,
                        parent: this.parent
                    });
                    lenta.render();
                } else {
                    Bus.emit('main');
                }
            });
    }

    getRussian(genre) {
        return this.map[genre];
    }

}