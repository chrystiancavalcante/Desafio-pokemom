import { useState } from 'react';
import PokemonCard from './PokemonCard';

interface Pokemon {
    id: number;
    name: string;
    // Adicione mais campos conforme necessário
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
      }else {
        // Caso err não seja um Error, você pode decidir como lidar com isso
        setSearch(prev => ({ ...prev, error: 'Ocorreu um erro desconhecido' }));
      }
    };
};
    return (
      <div>
        <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input 
            id="name"
            type="text" 
            value={search.name} 
            onChange={(e) => setSearch(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="type">Tipo:</label>
          <input 
            id="type"
            type="text" 
            value={search.type} 
            onChange={(e) => setSearch(prev => ({ ...prev, type: e.target.value }))}
          />
        </div>
          <button type="submit">Pesquisar</button>
        </form>
  
        {/* Exibição de Erros */}
        {search.error && <p>Erro: {search.error}</p>}
  
        {/* Lista de Pokémons */}
        <div>
          {search.pokemons.map(pokemon => (
            <div key={pokemon.id}>
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
              {/* Outros detalhes do Pokémon */}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default PokemonSearch;
