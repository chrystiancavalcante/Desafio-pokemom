import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, CircularProgress, Box, Grid, Typography, Paper } from '@mui/material';
import PokemonCard from './PokemonCard';
import './PokemonList.css';
import { Pokemon } from './Types';

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const limit = 20;
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPokemonRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && shouldLoad) {
        fetchPokemons();
      }
    });

    if (node) observer.current.observe(node);
  }, [isLoading, shouldLoad]);

  const fetchPokemons = async () => {
    setIsLoading(true);
    try {
      const offset = page * limit;
      const response = await fetch(`http://localhost:3000/pokemons?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      setPokemons(prevPokemons => [...prevPokemons, ...data]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Erro ao buscar Pokémons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shouldLoad) {
      fetchPokemons();
    }
  }, [shouldLoad]);

  return (
    <Box p={3}>
      <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
        <Typography className="pokemonTypography" variant="h4" style={{fontFamily: 'Luckiest Guy'}} gutterBottom>
          Lista de Pokémons
        </Typography>

        {!shouldLoad && (
          <Button variant="contained" color="primary" onClick={() => setShouldLoad(true)}>
            Listar Todos os Pokémons
          </Button>
        )}

        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {pokemons.map((pokemon, index) => (
            pokemons.length === index + 1 ? 
              <Grid item xs={12} sm={6} md={4} lg={2} key={pokemon.id} ref={lastPokemonRef}>
                <PokemonCard pokemon={pokemon} />
              </Grid> : 
              <Grid item xs={12} sm={6} md={4} lg={2} key={pokemon.id}>
                <PokemonCard pokemon={pokemon} />
              </Grid>
          ))}
        </Grid>

        {isLoading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default PokemonList;
