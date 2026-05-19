import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../helpers/api-errors';

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  void req;
  void _next;

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.error,
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    error: 'InternalServerError',
    statusCode: 500,
    message: 'Erro interno no serveidor',
  });
}
