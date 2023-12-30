import React, { useState, useEffect } from 'react';

interface Evolution {
  name: string;
  imageUrl: string;
}

const PokemonEvolutions: React.FC<{ pokemonId: number }> = ({ pokemonId }) => {
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);

  const fetchEvolutions = async (pokemonId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/pokemon/${pokemonId}/evolutions`);
      const data = await response.json();
      parseEvolutions(data);
    } catch (error) {
      console.error('Erro ao buscar evoluções:', error);
    }
  };

  const parseEvolutions = (data: any) => {
    const evolutionsArray: Evolution[] = [];
    let currentStage = data;

    while (currentStage && currentStage.evolves_to) {
      evolutionsArray.push({
        name: currentStage.species.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(currentStage.species.url)}.png`
      });

      if (currentStage.evolves_to.length > 0) {
        currentStage = currentStage.evolves_to[0];
      } else {
        break;
      }
    }

    setEvolutions(evolutionsArray);
  };

  const getIdFromUrl = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  useEffect(() => {
    if (pokemonId) {
      fetchEvolutions(pokemonId);
    }
  }, [pokemonId]);

  return (
    <div>
      {evolutions.map((evolution, index) => (
        <div key={index}>
          <img src={evolution.imageUrl} alt={evolution.name} />
          <h3>{evolution.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default PokemonEvolutions;
