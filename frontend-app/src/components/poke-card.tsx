import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const PokeCard = (props: any) => {
	console.log('Poke in Card: ', props);

	const pokemon = props.pokemon;
	const species = props.species;

	const pokeText = species.flavor_text_entries[0].flavor_text;

	return (
		<>
			<Card sx={{ maxWidth: 345 }}>
				<CardMedia
					sx={{ height: 350 }}
					image={pokemon.sprites.other.home.front_default}
					title={pokemon.name}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{pokemon.name}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{pokeText}
					</Typography>
				</CardContent>
			</Card>
		</>
	)
}

export default PokeCard;