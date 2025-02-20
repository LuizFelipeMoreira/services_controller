export class ApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class UserNotFound extends ApiError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class UserAlreadyExits extends ApiError {
    constructor(message: string) {
        super(message, 409);
    }
}
