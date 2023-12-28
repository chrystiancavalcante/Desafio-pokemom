interface Pokemon {
    name: string;
    type: string[];
    id: number;
  }

interface PokemonTeam {
    id: number;
    pokemons: Pokemon[];
  }