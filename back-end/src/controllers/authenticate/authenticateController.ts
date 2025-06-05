import { NextFunction, Request, Response } from 'express';
import { CreateUserUseCase } from '../../use-cases/authenticate/CreateUserUseCase';
import { LoginUserUseCase } from '../../use-cases/authenticate/LoginUserUseCase';

import UserRepository from '../../repositories/auth-repositories/UserRepository';

class AuthController {
    async signUp(req: Request, res: Response, next: NextFunction) {
        const { name, email, password } = req.body;

        try {
            const createUserUseCase = new CreateUserUseCase(UserRepository);
            const newUser = await createUserUseCase.execute(name, email, password);

            res.status(200).json({
                message: 'User Created',
                ...newUser,
            });
        } catch (error) {
            next(error);
        }
    }

    async signIn(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const loginUserUseCase = new LoginUserUseCase(UserRepository);
            const userData = await loginUserUseCase.execute(email, password);

            if (!userData) {
                return res.status(401).json({ message: 'Email ou senha inválidos' });
            }

            return res.status(200).json(userData);
        } catch (e: unknown) {
            console.log(e);

            return res.status(500).json({ message: 'Erro interno ao fazer login' });
        }
    }

    logout(req: Request, res: Response) {
        res.status(200).json({ message: 'Subiu servidor' });
    }
}

export default new AuthController();
