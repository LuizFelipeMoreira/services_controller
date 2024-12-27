import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../use-cases/authenticate/CreateUserUseCase';
import { LoginUserUseCase } from '../../use-cases/authenticate/LoginUserUseCase';

import UserRepository from '../../repositories/auth-repositories/UserRepository';

class AuthController {
    async create(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const createUserUseCase = new CreateUserUseCase();
            const newUser = await createUserUseCase.execute(email, password);

            res.status(200).json({
                message: 'User Created',
                ...newUser,
            });
        } catch (error) {}
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const loginUserUseCase = new LoginUserUseCase(UserRepository);
            const user = loginUserUseCase.execute(email, password);
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
