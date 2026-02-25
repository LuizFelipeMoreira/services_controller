import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../../repositories/auth-repositories/IUserRepository';
import { InvalidCredentials, UserNotFound } from '../../../helpers/ApiErrors';

interface IUserResponse {
  token: string;
  id: number;
  name: string;
}

class LoginUserUseCase {
  constructor(private authRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<IUserResponse | null> {
    const userExists = await this.authRepository.getUserByEmail(email);
    if (!userExists) throw new UserNotFound();

    const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
    if (!isPasswordCorrect) throw new InvalidCredentials();

    const { id, name } = userExists;

    const token = jwt.sign({ id, name, email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return {
      token,
      id: userExists.id,
      name: userExists.name,
    };
  }
}

export { LoginUserUseCase };
