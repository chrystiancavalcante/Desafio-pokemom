import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../services/jwtService';
import UserService from '../services/userService';

const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await UserService.getUserByUsername(username);
        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha inválida' });
        }

        const token = generateToken(user);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao fazer login' });
    }
});
export default router;