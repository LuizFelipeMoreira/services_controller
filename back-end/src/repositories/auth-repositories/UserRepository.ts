import User from '../../database/model/Users';
import { IUserRepository } from './IUserRepository';

class UserRepository implements IUserRepository {
    async createUser(name: string, email: string, password: string) {
        const user = await User.create({
            name,
            email,
            password,
        });

        return user;
    }

    async getUserByEmail(email: string) {
        return await User.findOne({
            where: {
                email,
            },
        });
    }

    async getUserById(id: number) {
        return await User.findOne({
            where: { id },
        });
    }
}

export default new UserRepository();
