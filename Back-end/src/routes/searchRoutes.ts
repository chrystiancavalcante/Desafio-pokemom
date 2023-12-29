import express, { Request, Response } from 'express';
import { getPokemonsByType, getPokemonsByName } from '../services/pokemonService';
const router = express.Router();

/**
 * @openapi
 * /pokemons/search:
 *   get:
 *     summary: Busca Pokémons por nome ou tipo
 *     tags: [Pokémons]
 *     description: Permite a filtragem dos Pokémons por nome, tipo ou ambos.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Nome do Pokémon para filtrar
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         required: false
 *         description: Tipo do Pokémon para filtrar
 *     responses:
 *       200:
 *         description: Uma lista de Pokémons filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   id:
 *                     type: number
 *                   type:
 *                     type: array
 *                     items:
 *                       type: string
 *       404:
 *         description: Nenhum Pokémon encontrado com os filtros fornecidos
 *       500:
 *         description: Erro ao filtrar Pokémons
 */
router.get('/pokemons/search', async (req: Request, res: Response) => {
  const { name, type } = req.query;

  try {
      let pokemons = [];

      if (name && type) {
          // Busca combinada por nome e tipo
          const pokemonsByName = await getPokemonsByName(name.toString());
          const pokemonsByType = await getPokemonsByType(type.toString());
          
          // Filtrar pokemonsByName para incluir apenas aqueles que também estão em pokemonsByType
          pokemons = pokemonsByName.filter(pokemon => 
              pokemonsByType.some(typePokemon => typePokemon.id === pokemon.id)
          );
      } else if (name) {
          // Busca apenas por nome
          pokemons = await getPokemonsByName(name.toString());
      } else if (type) {
          // Busca apenas por tipo
          pokemons = await getPokemonsByType(type.toString());
      } else {
          // Se nenhum filtro for fornecido, decida o que fazer (ex: retornar erro ou lista padrão)
          return res.status(400).send('Parâmetros de pesquisa não fornecidos');
      }

      if (pokemons.length === 0) {
          return res.status(404).send('Nenhum Pokémon encontrado com os filtros fornecidos.');
      }

      res.json(pokemons);
  } catch (error) {
      res.status(500).send('Erro ao buscar Pokémons');
  }
});
export default router;