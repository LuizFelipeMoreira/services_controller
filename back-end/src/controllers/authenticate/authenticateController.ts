import { Request, Response } from 'express';
import UserRepository from '../../repositories/auth-repositories/UserRepository';
import { CreateUserUseCase } from '../../use-cases/authenticate/createUser /CreateUserUseCase';
import { GetMeUseCase } from '../../use-cases/authenticate/getMeUse/GetMeUseCase';
import { LoginUserUseCase } from '../../use-cases/authenticate/loginUser/LoginUserUseCase';

class AuthController {
  public async signUp(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUserUseCase = new CreateUserUseCase(UserRepository);
    const newUser = await createUserUseCase.execute(name, email, password);

    res.status(200).json({
      message: 'User Created',
      ...newUser,
    });
  }

  public async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const loginUserUseCase = new LoginUserUseCase(UserRepository);
    const userData = await loginUserUseCase.execute(email, password);

    if (!userData) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    return res.status(200).json(userData);
  }

  public getMe(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Nao autorizado' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Nao autorizado' });
    }

    try {
      const getMeUseCase = new GetMeUseCase();
      const profile = getMeUseCase.execute(token);

      return res.status(200).json(profile);
    } catch {
      return res.status(401).json({ message: 'Nao autorizado' });
    }
  }
}

export default new AuthController();
