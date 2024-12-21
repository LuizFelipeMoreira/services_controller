import { Request, Response } from 'express';

class AuthController {
    async create(req: Request, res: Response) {
        res.status(200).json({ message: 'Subiu servidor' });
    }

    async login(req: Request, res: Response) {
        res.status(200).json({ message: 'Subiu servidor' });
    }

    logout(req: Request, res: Response) {
        res.status(200).json({ message: 'Subiu servidor' });
    }
}

export default new AuthController();
