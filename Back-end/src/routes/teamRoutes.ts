import express, { Request, Response } from 'express';
import { verifyToken } from '../authMiddleware';
const router = express.Router();

const teams: PokemonTeam[] = []; 
let nextTeamId = 1;

/**
 * @openapi
 * /team:
 *   post:
 *     summary: Cria um novo time de Pokémons
 *     description: Recebe um array de Pokémons e cria um novo time com exatamente 5 membros.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pokemons:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Lista dos nomes dos Pokémons
 *                 example: ["Pikachu", "Charmander", "Squirtle", "Bulbasaur", "Eevee"]
 *     responses:
 *       201:
 *         description: Time de Pokémons criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 pokemons:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Erro na criação do time (geralmente causado por um número incorreto de Pokémons)
 */
router.post('/team', verifyToken, (req: Request, res: Response) => {
    const { pokemons } = req.body;
    if (!pokemons || pokemons.length !== 5) {
      return res.status(400).send('Um time deve ter exatamente 5 Pokémons.');
    }
  
    const team: PokemonTeam = { id: nextTeamId++, pokemons };
    teams.push(team);
    res.status(201).json(team);
  });

export default router;