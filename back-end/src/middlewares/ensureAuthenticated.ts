import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'Token nao fornecido' });

    const [, token] = authHeader.split(' ');
    console.log(token);

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);

        console.log(decodedToken);

        next();
    } catch (err: unknown) {
        console.log(err);
        return res.send(401).json({ message: 'Token invalido ou expirado' });
    }
}
