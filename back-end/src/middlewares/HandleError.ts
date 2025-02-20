import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/ApiErrors';

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Erro capturado');

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(500).json({ message: 'Erro interno no servidor cacete' });
};

export { ErrorHandler };
