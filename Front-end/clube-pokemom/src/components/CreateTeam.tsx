import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Snackbar, Alert, Paper } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PokemonCard from './PokemonCard';
import './layout/CarouselStyles.css';
import { Pokemon } from '../types/Types';

const CreateTeam: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<number[]>([]);
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showTeam, setShowTeam] = useState(false);
  const [isTeamCreated, setIsTeamCreated] = useState(false);
  const [page, setPage] = useState<number>(0);
  const limit = 20;

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/pokemons?limit=${limit}&offset=${page * limit}`);
      const data: Pokemon[] = await response.json();
      setPokemons(prev => [...prev, ...data]);
    } catch (err) {
      setError('Erro ao buscar Pokémons');
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handlePokemonSelect = (pokemonId: number) => {
    setSelectedPokemons(prev => {
      if (prev.includes(pokemonId)) {
        return prev.filter(id => id !== pokemonId);
      } else if (prev.length === 5) {
        setError('Número máximo de 5 Pokémons no time');
        return prev;
      } else {
        return [...prev, pokemonId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (selectedPokemons.length === 5) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/team`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ pokemons: selectedPokemons })
        });

        if (!response.ok) {
          throw new Error('Falha ao criar o time');
        }

        const createdTeam = pokemons.filter(pokemon => selectedPokemons.includes(pokemon.id));
        setTeam(createdTeam);
        setSuccessMessage('Parabéns! Seu time foi criado com sucesso!');
        setIsTeamCreated(true);
      } catch (err) {
        setError('Erro ao criar o time');
      }
    } else {
      setError('Selecione exatamente 5 Pokémons');
    }
  };

  // Configurações para o carrossel Slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    arrows: true,
    afterChange: (currentSlide: number) => {
      if (currentSlide + 5 >= pokemons.length) {
        handleLoadMore();
      }
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true
        }
      }
    ]
  };

  // Estilo para os itens selecionados no carrossel
  const selectedStyle = {
    border: '3px solid green',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
  };

  return (
    <Box p={3}>
      <Paper className='transparent-background' elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
        <Typography className="pokemonTypography" variant="h4" style={{ fontFamily: 'Luckiest Guy' }} gutterBottom>
          Escolha e crie seu Time de Pokémons
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '1024px' }}>
          <Slider {...settings}>
            {pokemons.map(pokemon => (
              <div key={pokemon.id} style={{ margin: '10px', display: 'flex', justifyContent: 'center'  }}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedPokemons.includes(pokemon.id)}
                    onChange={() => handlePokemonSelect(pokemon.id)}
                    style={{ display: 'none' }} // Esconde o checkbox padrão
                  />
                  <div className="pokemon-list-container"
                    style={selectedPokemons.includes(pokemon.id) ? selectedStyle : {}}>
                    <PokemonCard pokemon={pokemon} />
                  </div>
                </label>
              </div>
            ))}
          </Slider>
          <Button style={{ marginTop: '10px' }} type="submit" variant="contained" color="primary" fullWidth>
            Criar Time
          </Button>
        </form>
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>

        <Snackbar open={Boolean(successMessage)} autoHideDuration={6000} onClose={() => setSuccessMessage('')}>
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>

        {isTeamCreated && (
          <Button style={{ marginTop: '10px' }} variant="outlined" onClick={() => setShowTeam(!showTeam)}>
            {showTeam ? 'Esconder Time' : 'Ver Time'}
          </Button>
        )}

        {showTeam && (
          <Box mt={2} style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ alignItems: 'center', marginTop: '10px' }}>
              <Typography className="pokemonTypography" variant="h5" style={{ fontFamily: 'Luckiest Guy', textAlign: 'center', margin:'10px' }}>Seu Time está preparado treinador</Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
              {team.map(pokemon => (
                <div key={pokemon.id} style={{ margin: '10px' }}>
                  <PokemonCard pokemon={pokemon} />
                </div>
              ))}
            </div>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CreateTeam;
