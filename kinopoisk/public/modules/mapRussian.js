class MapRussian {

  constructor() {
    this.map = [];
    this.map.fantasy = 'Фантастика';
    this.map.comedy = 'Комедии';
    this.map.horror = 'Ужасы';
    this.map.drama = 'Драма';
    this.map.war = 'Боевики';
    this.map.triller = 'Триллеры';
    this.map['Фантастика'] = 'fantasy';
    this.map['Комедия'] = 'comedy';
    this.map['Ужасы'] = 'horror';
    this.map['Драма'] = 'drama';
    this.map['Триллер'] = 'triller';
    this.map['Боевик'] = 'war';
  }

  get(genre) {
    return this.map[genre];
  }

}

export default new MapRussian();
