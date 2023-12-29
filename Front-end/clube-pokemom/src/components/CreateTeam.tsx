import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

interface Pokemon {
  id: number;
  name: string;
}

const CreateTeam: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<number[]>([]);
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Substitua esta parte pela lógica real de busca de Pokémons
    const fetchPokemons = async () => {
      try {
        const response = await fetch('http://localhost:3000/pokemons');
        const data = await response.json();
        setPokemons(data);
      } catch (err) {
        setError('Erro ao buscar Pokémons');
      }
    };

    fetchPokemons();
  }, []);

  const handlePokemonSelect = (pokemonId: number) => {
    setSelectedPokemons(prev => {
      if (prev.includes(pokemonId)) {
        return prev.filter(id => id !== pokemonId);
      } else if (prev.length < 5) {
        return [...prev, pokemonId];
      }
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  
    if (selectedPokemons.length === 5) {
      try {
        // Recuperar o token do localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }
  
        // Enviar a requisição ao servidor com o token no cabeçalho de autorização
        const response = await fetch('http://localhost:3000/team', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Adiciona o token ao cabeçalho de autorização
          },
          body: JSON.stringify({ pokemons: selectedPokemons })
        });
  
        if (!response.ok) {
          throw new Error('Falha ao criar o time');
        }
  
        const createdTeam = pokemons.filter(pokemon => selectedPokemons.includes(pokemon.id));
        setTeam(createdTeam);
        setSuccessMessage('Parabéns! Seu time foi criado com sucesso!');
      } catch (err) {
        setError('Erro ao criar o time');
      }
    } else {
      setError('Selecione exatamente 5 Pokémons');
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {pokemons.map(pokemon => (
          <div key={pokemon.id}>
            <label>
              <input 
                type="checkbox" 
                checked={selectedPokemons.includes(pokemon.id)}
                onChange={() => handlePokemonSelect(pokemon.id)}
              />
              <div className="pokemon-list-container">
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              </div>
            </label>
          </div>
        ))}
        <button type="submit">Criar Time</button>
      </form>

      {error && <p>{error}</p>}
      {successMessage && (
        <div>
          <p>{successMessage}</p>
          <div>
            <h3>Seu Time:</h3>
            {team.map(pokemon => (
            <div className="pokemon-list-container">
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            </div>
              // Adicione mais detalhes conforme necessário
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTeam;
