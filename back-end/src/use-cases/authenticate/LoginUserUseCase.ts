import { IUserRepository } from '../../repositories/auth-repositories/IUserRepository';

class LoginUserUseCase {
    constructor(private authRepository: IUserRepository) {}

    async execute(email: string, password: string) {}
}

export { LoginUserUseCase };
