import express, { Request, Response } from 'express';
import axios from 'axios';
const router = express.Router();

/**
 * @openapi
* /pokemon/{id}/evolutions:
*   get:
*     summary: Retorna as evoluções de um Pokémon específico
*     description: Fornece as informações de evolução para um Pokémon baseado em seu ID.
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: O ID único do Pokémon
*     responses:
*       200:
*         description: Informações de evolução do Pokémon
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 chain:
*                   type: object
*                   description: A cadeia de evoluções do Pokémon
*                   properties:
*                     species:
*                       type: object
*                       properties:
*                         name:
*                           type: string
*                         url:
*                           type: string
*                     evolves_to:
*                       type: array
*                       items:
*                         type: object
*                         properties:
*                           // Estrutura semelhante para espécies subsequentes
*       500:
*         description: Erro ao buscar evoluções dos Pokémons
*/

router.get('/pokemon/:id/evolutions', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const evolutionResponse = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
      const evolutions = evolutionResponse.data.chain;
      res.json(evolutions);
    } catch (error) {
      res.status(500).send('Erro ao buscar evoluções dos Pokémons');
    }
  });

export default router;  