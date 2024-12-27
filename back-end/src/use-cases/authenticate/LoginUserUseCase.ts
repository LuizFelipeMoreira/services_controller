import bcrypt from 'bcrypt';
import { IUserRepository } from '../../repositories/auth-repositories/IUserRepository';
import { IUser } from '../../@types/IUser';

class LoginUserUseCase {
    constructor(private authRepository: IUserRepository) {}

    async execute(email: string, password: string): Promise<IUser | null> {
        try {
            const userExists = await this.authRepository.getUserByEmail(email);
            if (!userExists) return null;

            const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
            if (!isPasswordCorrect) return null;

            const { id, name } = userExists;

            return { id, name, email, password: userExists.password };
        } catch (error) {
            throw new Error(`Login failed: ${error}`);
        }
    }
}

export { LoginUserUseCase };
