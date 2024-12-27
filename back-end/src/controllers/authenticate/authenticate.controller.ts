import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../use-cases/authenticate/CreateUserUseCase';
import { LoginUserUseCase } from '../../use-cases/authenticate/LoginUserUseCase';

import UserRepository from '../../repositories/auth-repositories/UserRepository';

class AuthController {
    async signUp(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try {
            const createUserUseCase = new CreateUserUseCase(UserRepository);
            const newUser = await createUserUseCase.execute(name, email, password);

            res.status(200).json({
                message: 'User Created',
                ...newUser,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async signIn(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const loginUserUseCase = new LoginUserUseCase(UserRepository);
            const user = await loginUserUseCase.execute(email, password);

            res.status(200).json({
                message: 'User Logged',
                user: {
                    id: user?.id,
                    name: user?.name,
                },
            });
        } catch (error) {
            console.log(error);
        }
        res.status(200).json({ message: 'Subiu servidor' });
    }

    logout(req: Request, res: Response) {
        res.status(200).json({ message: 'Subiu servidor' });
    }
}

export default new AuthController();
