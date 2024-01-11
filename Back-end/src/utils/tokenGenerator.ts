import crypto from 'crypto';

export const generateUniqueToken = (user: { id: number; username: string })=> {
  return crypto.randomBytes(30).toString('hex'); // Gera um token seguro e único
};
