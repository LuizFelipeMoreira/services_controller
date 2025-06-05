import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../../@types/IUser';
import { IUserRepository } from '../../repositories/auth-repositories/IUserRepository';

interface IUserResponse {
    token: string;
    user: Omit<IUser, 'password'>;
}

class LoginUserUseCase {
    constructor(private authRepository: IUserRepository) {}

    async execute(email: string, password: string): Promise<IUserResponse | null> {
        try {
            const userExists = await this.authRepository.getUserByEmail(email);
            if (!userExists) return null;

            const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
            if (!isPasswordCorrect) return null;

            const { id, name } = userExists;

            const token = jwt.sign(
                { id, name, email },
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' }
            );

            return {
                token,
                user: {
                    id,
                    name,
                    email,
                },
            };
        } catch (error) {
            throw new Error(`Login failed: ${error}`);
        }
    }
}

export { LoginUserUseCase };
