import User from '../models/user';
import db from '../../models/db';

class UserService {
  static async createUser(username: string, password: string) {
    return User.create({ username, password });
  }

  static async getUserByUsername(username: string) {
    return User.findOne({ where: { username } });
  }
}

export const findOrCreateUser = async (email: string, hashedPassword: string) => {
  try {
      const [user, created] = await db.User.findOrCreate({
          where: { email },
          defaults: { email, password: hashedPassword }
      });

      return user;
  } catch (error) {
      console.error('Erro ao encontrar ou criar usuário:', error);
      throw error;
  }
};

export const saveToken = async (userId: number, token: string) => {
  // Lógica para salvar o token no banco de dados, associado ao userId
};

export default UserService;
