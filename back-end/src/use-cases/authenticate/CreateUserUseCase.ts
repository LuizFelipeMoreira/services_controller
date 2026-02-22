import bcrypt from 'bcrypt';
import User from '../../database/model/Users';
import { IUserRepository } from '../../repositories/auth-repositories/IUserRepository';
import { UserAlreadyExits } from '../../helpers/ApiErrors';

class CreateUserUseCase {
  constructor(private readonly authRepository: IUserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User | null> {
    try {
      const existingUser = await this.authRepository.getUserByEmail(email);

      if (existingUser) {
        throw new UserAlreadyExits('Usuario ja existe');
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await this.authRepository.createUser(name, email, hashPassword);

      return newUser;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export { CreateUserUseCase };
