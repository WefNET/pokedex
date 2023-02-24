import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react"
import './App.css';
import pokeapiService from "./services/pokeapi-service";

function App() {
  const [allPokemon, setAllPokemon] = useState<any[]>([]);
  const [pokemon, setPokemon] = useState<any>();

  const fetchAllPokemon = async () => {
    const { data } = await pokeapiService.getAllPokemon();

    const results: any[] = data.results;

    const pokeNames = results.map((poke: any, index) => {
      const urlBits = JSON.stringify(poke.url).split('/');

      // need 2nd to last
      const id = urlBits[urlBits.length - 2]

      return {
        "label": poke.name,
        "id": id
      }
    });

    setAllPokemon(pokeNames);
  }

  const fetchPokemon = async (name: string) => {
    console.log('Fetch One Poke with: ', name);

    const poke = allPokemon.find(p => p.label === name);

    if (poke) {
      console.log('Poke in data?', poke);

      const { data } = await pokeapiService.getPokemon(poke.id);

      console.log(data);
      setPokemon(data);
    }
  }

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  return (
    <>
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

      {pokemon &&
        <div>
          <h1>{pokemon.name}</h1>

          <img src={pokemon.sprites.front_default} alt="Front default"/>
          <img src={pokemon.sprites.back_default} alt="Back default"/>
          <img src={pokemon.sprites.front_shiny} alt="Front shiny"/>
          <img src={pokemon.sprites.back_shiny} alt="Back shiny"/>
        </div>
      }

      {/* {pokemon.map((p, index) => (
      <>
      <p>{p.name}</p>
      </>
    ))} */}
    </>
  );
}

export default App;
