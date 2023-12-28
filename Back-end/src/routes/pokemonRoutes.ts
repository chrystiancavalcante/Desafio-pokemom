import express, { Request, Response } from 'express';
import { getPokemons } from '../services/pokemonService';
const router = express.Router();

/**
 * @openapi
 * /pokemons:
 *   get:
 *     summary: Retorna uma lista de pokémons
 *     responses:
 *       200:
 *         description: Uma lista de pokémons
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
 */

router.get('/pokemons', async (req: Request, res: Response) => {
    try {
      const pokemons = await getPokemons();
      res.json(pokemons);
    } catch (error) {
      res.status(500).send('Erro ao buscar Pokémons');
    }
  });
  
  export default router;
