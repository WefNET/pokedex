import http from "./http-common";

class PokeAPIService {
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

export default new PokeAPIService();