import { useState } from 'react';
import PokemonCard from './PokemonCard';

interface Pokemon {
  id: number;
  name: string;
}

const PokemonList = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);
  const limit = 20;

  const fetchPokemons = async () => {
    try {
      const offset = page * limit;
      const response = await fetch(`http://localhost:3000/pokemons?limit=${limit}&offset=${offset}`);
      const data = await response.json();
      setPokemons(prevPokemons => [...prevPokemons, ...data]); // Concatena os novos Pokémons aos existentes
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Erro ao buscar Pokémons:', error);
    }
  };

  return (
    <div>
      <div className="pokemon-list-container">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
        <button onClick={fetchPokemons}>Carregar Mais Pokémons</button>
      </div>
    </div>
  );
};

export default PokemonList;
