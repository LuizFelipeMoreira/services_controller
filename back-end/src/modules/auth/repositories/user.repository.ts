import User from '../../../database/model/user.model';
import { UserRepositoryInterface } from './user.repository.interface';

class UserRepository implements UserRepositoryInterface {
  async createUser(name: string, email: string, password: string) {
    const user = await User.create({
      name,
      email,
      password,
    });

    return user.get();
  }

  async getUserByEmail(email: string) {
    return await User.findOne({
      where: {
        email,
      },
      raw: true,
    });
  }

  async getUserById(id: number) {
    return await User.findOne({
      where: { id },
      raw: true,
    });
  }
}

export default new UserRepository();
