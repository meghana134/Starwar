interface ISwapiData {
  count: number;
  next: string | undefined;
  previous: string | undefined;
}

//People
export interface ISwapiPeople extends ISwapiData {
  results: Array<ISwapiCharacter>;
}

export interface ISwapiCharacter {
  name: string;
  height: string;
  mass: string;
  gender: string;
  url: string;
}

export interface ISwapiUser {
  name: string;
  height: string;
  birth_year: string;
  gender: string;
}
//Planets
export interface ISwapiPlanets extends ISwapiData {
  results: Array<ISwapiPlanet>;
}

export interface ISwapiPlanet {
  name: string;
  climate: string;
  gravity: string;
  terrain: string;
  population: string;
}
//Films
export interface ISwapiFilms extends ISwapiData {
  results: Array<ISwapiFilm>;
}

export interface ISwapiFilm {
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: Date;
  opening_crawl: string;
}
//Species
export interface ISwapiSpecies {}
//Vehicles
export interface ISwapiVehicles {}
//Starships
export interface ISwapiStarship {}
