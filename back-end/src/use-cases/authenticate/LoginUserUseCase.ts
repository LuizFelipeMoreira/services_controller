import bcrypt from 'bcrypt';
import { IUserRepository } from '../../repositories/auth-repositories/IUserRepository';
import { IUser } from '../../@types/IUser';

class LoginUserUseCase {
    constructor(private authRepository: IUserRepository) {}

    async execute(email: string, password: string): Promise<IUser | null> {
        try {
            const userExists = await this.authRepository.getUserByEmail(email);
            if (!userExists) throw new Error('Email not invalid');

            const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
            if (!isPasswordCorrect) throw new Error('User is not valid');

            const { id, name } = userExists;

            return { id, name, email, password: '%$%$' };
        } catch (error) {
            throw new Error(`Login failed: ${error}`);
        }
    }
}

export { LoginUserUseCase };
