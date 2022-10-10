export interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: Date;
    edited: Date;
    url: string;
}

export interface PersonSearchData {
    count: number;
    next: string;
    previous?: any;
    results: Person[];
}

export interface QueryParams {
    phrase: string;
    page: number;
}