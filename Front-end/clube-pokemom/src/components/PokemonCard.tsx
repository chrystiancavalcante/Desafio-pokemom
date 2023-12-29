import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Pokemon {
  id: number;
  name: string;
}

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  return (
    <Card className="pokemon-card">
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={pokemon.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.name}
        </Typography>
        {/* Adicione mais detalhes conforme necessário */}
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
