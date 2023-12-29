import express, { Request, Response } from 'express';
import { getPokemons } from '../services/pokemonService';
const router = express.Router();

/**
 * @openapi
 *   tags:
 *   name: Pokémons
 *   description: Operações de busca de pokémons
 * 
 * /pokemons:
 *   get:
 *     summary: Retorna uma lista de pokémons
 *     tags: [Pokémons]
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
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = parseInt(req.query.offset as string) || 0;
    try {
      const pokemons = await getPokemons(limit, offset);
      res.json(pokemons);
    } catch (error) {
      res.status(500).send('Erro ao buscar Pokémons');
    }
  });
  
  export default router;
