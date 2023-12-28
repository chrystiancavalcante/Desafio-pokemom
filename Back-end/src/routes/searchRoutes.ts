import express, { Request, Response } from 'express';
import { getPokemons } from '../services/pokemonService';
const router = express.Router();

/**
 * @openapi
 * /pokemons/search:
 *   get:
 *     summary: Busca Pokémons por nome ou tipo
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

export default router;  