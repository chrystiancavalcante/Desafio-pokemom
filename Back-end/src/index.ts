import express, { Request, Response } from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json()); 


interface Pokemon {
  name: string;
  type: string[];
  id: number;
}

interface PokemonTeam {
  id: number;
  pokemons: Pokemon[];
}

const teams: PokemonTeam[] = []; 
let nextTeamId = 1;

async function getPokemons(): Promise<Pokemon[]> {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    const pokemons = await Promise.all(response.data.results.map(async (pokemon: { url: string; name: any; }) => {
      const pokemonDetails = await axios.get(pokemon.url); // Busca detalhes adicionais para cada Pokémon
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

// 1. Rota para Criar um Time de Pokémons
app.post('/team', (req: Request, res: Response) => {
  const { pokemons } = req.body;
  if (!pokemons || pokemons.length !== 5) {
    return res.status(400).send('Um time deve ter exatamente 5 Pokémons.');
  }

  const team: PokemonTeam = { id: nextTeamId++, pokemons };
  teams.push(team);
  res.status(201).json(team);
});

// 2. Rota para Listar Todos os Pokémons
app.get('/pokemons', async (req: Request, res: Response) => {
  try {
    const pokemons = await getPokemons();
    res.json(pokemons);
  } catch (error) {
    res.status(500).send('Erro ao buscar Pokémons');
  }
});

// 3. Rota para Filtrar por Nome ou Tipo
app.get('/pokemons/search', async (req: Request, res: Response) => {
  const { name, type } = req.query;
  try {
    let pokemons = await getPokemons();
    if (name) {
      pokemons = pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(name.toString().toLowerCase())
      );
    }
    if (type) {
      pokemons = pokemons.filter(pokemon => 
        pokemon.type.some(typeItem => typeItem.toLowerCase() === type.toString().toLowerCase())
      );
    }

    if (pokemons.length === 0) {
      return res.status(404).send('Nenhum Pokémon encontrado com os filtros fornecidos.');
    }

    res.json(pokemons);
  } catch (error) {
    res.status(500).send('Erro ao filtrar Pokémons');
  }
});

// 4. Rota para ver a evoluçao de um Pokémom
app.get('/pokemon/:id/evolutions', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const evolutionResponse = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
    const evolutions = evolutionResponse.data.chain;
    res.json(evolutions);
  } catch (error) {
    res.status(500).send('Erro ao buscar evoluções dos Pokémons');
  }
});
  
export default app;