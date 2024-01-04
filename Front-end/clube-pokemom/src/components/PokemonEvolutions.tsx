import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import { Evolution } from '../types/Types';

const PokemonEvolutions: React.FC<{ pokemonId: number }> = ({ pokemonId }) => {
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvolutions = async (pokemonId: number) => {
    setIsLoading(true);
    setEvolutions([]);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/pokemon/${pokemonId}/evolutions`);
      const data = await response.json();
      parseEvolutions(data);
    } catch (error) {
      console.error('Erro ao buscar evoluções:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const parseEvolutions = (data: any) => {
    const evolutionsArray: Evolution[] = [];
    let currentStage = data;

    while (currentStage) {
      const evolutionData = {
        id: getIdFromUrl(currentStage.species.url),
        name: currentStage.species.name,
        type: currentStage.type,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(currentStage.species.url)}.png`
      };

      evolutionsArray.push(evolutionData);

      currentStage = currentStage.evolves_to.length > 0 ? currentStage.evolves_to[0] : null;
    }

    setEvolutions(evolutionsArray);
  };

  const getIdFromUrl = (url: string) => {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2], 10);
  };

  useEffect(() => {
    if (pokemonId) {
      fetchEvolutions(pokemonId);
    }
  }, [pokemonId]);

  return (
    <Box p={3}>
      {isLoading ? (
        <Box display="flex" justifyContent="center" style={{ marginTop: '20px' }}>
          <CircularProgress />
        </Box>
      ) : evolutions.length === 0 ? (
        <Typography className="pokemonTypography" variant="h4" style={{ fontFamily: 'Luckiest Guy' }} gutterBottom>
          Nenhuma evolução encontrada.
        </Typography>
      ) : (
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          {evolutions.map((evolution) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={evolution.id}>
              <PokemonCard pokemon={evolution} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PokemonEvolutions;
