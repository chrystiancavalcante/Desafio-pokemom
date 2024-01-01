import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, Grid, CircularProgress } from '@mui/material';
import PokemonCard from './PokemonCard';
import { Pokemon, SearchState } from './Types';

const PokemonSearch: React.FC = () => {
  const [search, setSearch] = useState<SearchState>({
    name: '',
    type: '',
    pokemons: [],
    error: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSearch(prev => ({ ...prev, error: '' }));

    try {
      const query = new URLSearchParams({
        name: search.name,
        type: search.type
      }).toString();
      const response = await fetch(`http://localhost:3000/pokemons/search?${query}`);

      if (!response.ok) {
        if (response.status === 404) {
          setSearch(prev => ({ ...prev, error: `Pokémon '${search.name}' não encontrado na Pokédex` }));
        } else {
          throw new Error('Falha na busca');
        }
        return;
      }

      const data: Pokemon[] = await response.json();
      if (data.length === 0 && search.name) {
        setSearch(prev => ({ ...prev, error: `Pokémon '${search.name}' não encontrado na Pokédex` }));
      } else {
        setSearch(prev => ({ ...prev, pokemons: data }));
      }

    } catch (err) {
      if (typeof err === "object" && err !== null && 'message' in err) {
        setSearch(prev => ({ ...prev, error: (err as Error).message }));
      } else {
        setSearch(prev => ({ ...prev, error: 'Ocorreu um erro desconhecido' }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
        <Typography className="pokemonTypography" variant="h4" style={{ fontFamily: 'Luckiest Guy' }} gutterBottom>
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

        {search.error && <Typography color="error" style={{ fontFamily: 'Luckiest Guy', marginTop: '10px' }}>Ops! {search.error}</Typography>}
          {isLoading && (
            <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '100px' }}>
              <CircularProgress />
            </Box>
          )}
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
