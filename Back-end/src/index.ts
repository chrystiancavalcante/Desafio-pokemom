import express, { Request, Response } from 'express';
const app = express();

interface Pokemon {
  name: string;
  type: string;
  id: number;
}

async function getPokemons(): Promise<Pokemon[]> {
  const pokemons = [
      { name: 'Bulbasaur', type: 'Grass', id: 1 },
      { name: 'Charmander', type: 'Fire', id: 4 },
      { name: 'Squirtle', type: 'Water', id: 7 },
      { name: 'Pikachu', type: 'Electric', id: 25 },
      { name: 'Eevee', type: 'Normal', id: 133 }
  ];

  return pokemons;
}

app.get('/pokemons', async (req: Request, res: Response) => {
  try {
      const pokemons = await getPokemons();
      const pokemonsList = pokemons.map(pokemon => pokemon.name).join(', ');
      res.send(`Lista de Pokémons: ${pokemonsList}`);
  } catch (error) {
      res.status(500).send('Erro ao buscar Pokémons');
  }
});

app.post('/cadastro', (req: Request, res: Response) => {
  // Lógica para cadastro
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
  