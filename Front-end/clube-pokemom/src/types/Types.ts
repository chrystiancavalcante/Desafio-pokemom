
export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  imageUrl?: string;
  }
  export interface Evolution {
    id: number;
    name: string;
    type: string[];
    imageUrl: string;
  }
  export interface SearchState {
    name: string;
    type: string;
    pokemons: Pokemon[];
    error: string;
  }