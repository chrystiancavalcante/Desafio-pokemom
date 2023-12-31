import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, Grid } from '@mui/material';
import PokemonCard from './PokemonCard';

interface Pokemon {
  id: number;
  name: string;
}

interface SearchState {
  name: string;
  type: string;
  pokemons: Pokemon[];
  error: string;
}

const PokemonSearch: React.FC = () => {
  const [search, setSearch] = useState<SearchState>({
    name: '',
    type: '',
    pokemons: [],
    error: ''
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(prev => ({ ...prev, error: '' }));

    try {
      const query = new URLSearchParams({ 
        name: search.name, 
        type: search.type 
      }).toString();
      const response = await fetch(`http://localhost:3000/pokemons/search?${query}`);
      
      if (!response.ok) {
        throw new Error('Falha na busca');
      }

      const data: Pokemon[] = await response.json();
      setSearch(prev => ({ ...prev, pokemons: data }));
      
    } catch (err) {
      if (typeof err === "object" && err !== null && 'message' in err) {
        setSearch(prev => ({ ...prev, error: (err as Error).message }));
      } else {
        setSearch(prev => ({ ...prev, error: 'Ocorreu um erro desconhecido' }));
      }
    }
  };

  return (
    <Box p={3}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography className="pokemonTypography" variant="h4" gutterBottom>
          Pesquisar Pokémons
        </Typography>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                label="Nome"
                type="text"
                value={search.name}
                onChange={(e) => setSearch(prev => ({ ...prev, name: e.target.value }))}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="type"
                label="Tipo"
                type="text"
                value={search.type}
                onChange={(e) => setSearch(prev => ({ ...prev, type: e.target.value }))}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Pesquisar
          </Button>
        </form>

        {search.error && <Typography color="error" style={{ marginTop: '10px' }}>Erro: {search.error}</Typography>}

        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {search.pokemons.map(pokemon => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default PokemonSearch;
