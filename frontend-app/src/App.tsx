import { AppBar, Autocomplete, Box, Button, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react"
import './App.css';
import PokeCard from "./components/poke-card";
import pokeapiService from "./services/pokeapi-service";

function App() {
	const [allPokemon, setAllPokemon] = useState<any[]>([]);
	const [pokemon, setPokemon] = useState<any>();
	const [species, setPokemonSpecies] = useState<any>();

	const fetchAllPokemon = async () => {
		const { data } = await pokeapiService.getAllPokemon();

		let results: any[] = data.results;

		const pokeNames = results.map((poke: any, index) => {
			const urlBits = JSON.stringify(poke.url).split('/');

			// need 2nd to last
			const id = urlBits[urlBits.length - 2]

			return {
				"label": poke.name as string,
				"id": id
			}
		});

		const sorted = pokeNames.sort((a, b) => { return a.label.localeCompare(b.label) });

		setAllPokemon(sorted);
	}

	const fetchPokemon = async (name: string) => {
		console.log('Fetch One Poke with: ', name);

		const poke = allPokemon.find(p => p.label === name);

		if (poke) {
			console.log('Poke in data?', poke);

			const pokemonPromise = pokeapiService.getPokemon(poke.id);
			const speciesPromise = pokeapiService.getSpecies(poke.id);

			Promise.all([pokemonPromise, speciesPromise]).then(([details, species]) => {
				console.log(details);
				setPokemon(details.data);
				console.log(species);
				setPokemonSpecies(species.data);
			});
		}
	}

	useEffect(() => {
		fetchAllPokemon();
	}, []);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Pokedex
						</Typography>
						<Button color="inherit">Wefler</Button>
					</Toolbar>
				</AppBar>

				<Container>
					<Box sx={{ marginTop: 4 }}>
						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={allPokemon}
							sx={{ width: 300 }}
							renderInput={(params) => <TextField {...params} label="Pick a Pokemon" />}
							onInputChange={(event, newInputValue) => {
								fetchPokemon(newInputValue);
							}}
						/>

						{pokemon && species &&
							<PokeCard pokemon={pokemon} species={species}/>
						}
					</Box>
				</Container>
			</Box>
		</>
	);
}

export default App;
