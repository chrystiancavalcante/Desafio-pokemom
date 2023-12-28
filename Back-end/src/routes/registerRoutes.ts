import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserService from '../services/userService'; 

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserService.createUser(username, hashedPassword);

        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao criar usuário'});
    }
});
export default router;