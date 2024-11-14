import { NextFunction, Request, Response } from 'express';

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    next();

    return res.status(500).json({ message: 'Erro interno no servidor' });
};

export { ErrorHandler };
