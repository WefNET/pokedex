import http from "./http-common";

export default class PokeAPIService {
    getAllPokemon() {
        return http.get<any>('pokemon?limit=2000');
    }

    getPokemon(id: any) {
        return http.get<any>(`pokemon/${id}`);
    }

	getSpecies(id: any) {
		return http.get<any>(`pokemon-species/${id}`);
	}
}