import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserService from '../services/userService';
import { generateToken } from '../services/jwtService';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Autenticação
 *   description: Operações de autenticação
 * 
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: O nome de usuário para registro
 *               password:
 *                 type: string
 *                 description: A senha para o usuário
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Entrada inválida
 */

router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserService.createUser(username, hashedPassword);

        const token = generateToken(user);
        return res.status(201).json({ token: token, user: { username, id: user.id } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar usuário'});
    }
});
export default router;