export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly error: string;

  constructor(err: string, message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.error = err;
  }
}

export class UserNotFound extends ApiError {
  constructor() {
    super('USER_NOT_FOUND', 'Usuário nao encontrado', 404);
  }
}

export class UserAlreadyExits extends ApiError {
  constructor() {
    super('USER_ALREADY_EXISTS', 'Usuário nao existe', 409);
  }
}

export class InvalidCredentials extends ApiError {
  constructor() {
    super('INVALID_CREDENTIALS', 'Email ou senha inválidos', 401);
  }
}

export class BadRequest extends ApiError {
  constructor() {
    super('BAD_REQUEST', 'Erro interno no servdor', 400);
  }
}
