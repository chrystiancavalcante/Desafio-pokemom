import User from '../models/user';

class UserService {
  static async createUser(username: string, password: string) {
    return User.create({ username, password });
  }

  static async getUserByUsername(username: string) {
    return User.findOne({ where: { username } });
  }
}

export default UserService;
