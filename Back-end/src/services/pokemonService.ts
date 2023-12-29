import axios from 'axios';

interface Pokemon {
  id: number;
  name: string;
}

export async function getPokemons(limit: number, offset: number): Promise<Pokemon[]> {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const pokemons = await Promise.all(response.data.results.map(async (pokemon: { url: string; name: any; }) => {
        const pokemonDetails = await axios.get(pokemon.url); 
        const types = pokemonDetails.data.types.map((typeInfo: { type: { name: any; }; }) => typeInfo.type.name);
        return {
          name: pokemon.name,
          id: pokemonDetails.data.id,
          type: types
        };
      }));
      return pokemons;
    } catch (error) {
      console.error('Erro ao buscar Pokémons: ', error);
      throw new Error('Erro ao buscar Pokémons');
    }
}

export async function getPokemonsByName(name: string): Promise<Pokemon[]> {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

    const pokemon = response.data;
    return [{
      id: pokemon.id,
      name: pokemon.name,
    }];
  } catch (error) {
    console.error('Erro ao buscar Pokémon:', error);
    // Retorne um array vazio ou lance um erro, dependendo da sua preferência
    return [];
  }
}

export async function getPokemonsByType(type: string): Promise<Pokemon[]> {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
    // Transforme a resposta da API no formato desejado
    const pokemons = response.data.pokemon.map((pokemonEntry: { pokemon: { id: any; name: any; }; }) => ({
      id: pokemonEntry.pokemon.id,
      name: pokemonEntry.pokemon.name,
      // outros campos necessários
    }));

    return pokemons;
  } catch (error) {
    console.error('Erro ao buscar Pokémon por tipo:', error);
    return [];
  }
}
