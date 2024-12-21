import { IUserRepository } from '../../repositories/auth-repositories/IUserRepository';

class CreateUserUseCase {
    constructor(private authRepository: IUserRepository) {}

    async execute() {}
}

export { CreateUserUseCase };
