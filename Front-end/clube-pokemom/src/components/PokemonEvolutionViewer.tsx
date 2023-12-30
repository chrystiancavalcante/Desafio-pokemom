import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import PokemonEvolutions from './PokemonEvolutions';

const PokemonEvolutionViewer: React.FC = () => {
  const [pokemonId, setPokemonId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(inputValue, 10);
    if (!isNaN(id)) {
      setPokemonId(id);
    }
  };

  return (
    <Box p={3}>
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Visualizador de Evoluções Pokémon
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <TextField
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Digite o ID do Pokémon"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Buscar Evoluções
          </Button>
        </form>

        {pokemonId && <PokemonEvolutions pokemonId={pokemonId} />}
      </Paper>
    </Box>
  );
};

export default PokemonEvolutionViewer;
