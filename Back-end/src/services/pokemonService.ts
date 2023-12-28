import axios from 'axios';

export async function getPokemons(): Promise<Pokemon[]> {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
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
