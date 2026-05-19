import bcrypt from 'bcrypt';
import User from '../../../../database/model/user.model';
import { UserAlreadyExits } from '../../../../helpers/api-errors';
import { UserRepositoryInterface } from '../../repositories/user.repository.interface';

class CreateUserUseCase {
  constructor(private readonly authRepository: UserRepositoryInterface) {}

  async execute(name: string, email: string, password: string): Promise<User | null> {
    const existingUser = await this.authRepository.getUserByEmail(email);
    if (existingUser) throw new UserAlreadyExits();

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await this.authRepository.createUser(name, email, hashPassword);

    return newUser;
  }
}

export { CreateUserUseCase };
