import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const getSecretKey = (): string => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("A chave secreta não está definida");
  }
  return secretKey;
};

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).send('Um token é necessário para a autenticação');
  }

  try {
    const secretKey = getSecretKey();
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Token inválido');
  }

  return next();
};
