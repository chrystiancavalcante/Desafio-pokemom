import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Pokemon } from './Types';

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const imageUrl = pokemon.imageUrl || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  
  const typeText = pokemon.type && pokemon.type.length > 0
  ? pokemon.type.join(', ')
  : ' ';

  return (
    <Card className="pokemon-card">
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className="pokemon-name" style={{fontFamily: 'Luckiest Guy'}}>
          {pokemon.name}
        </Typography>
        <Typography variant="body2" className="pokemon-type">
          {typeText}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
