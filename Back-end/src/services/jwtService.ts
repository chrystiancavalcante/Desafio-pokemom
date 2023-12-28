import jwt from 'jsonwebtoken';

const getSecretKey = (): string => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error("A chave secreta não está definida");
  }
  return secretKey;
};

export const generateToken = (user: any) => {
  const secretKey = getSecretKey();
  return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '24h' });
};
