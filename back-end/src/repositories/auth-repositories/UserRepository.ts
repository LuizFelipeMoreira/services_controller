import { User } from '../../@types/UserType';
import { IUserRepository } from './IUserRepository';

class UserRepository implements IUserRepository {
    public async createUser(): Promise<void> {
        const user = await User.create({ name: 'Felipinno' });
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        console.log('felipinno');
    }

    public async getUserById(id: number): Promise<User | null> {
        console.log('felipinno');
    }
}

export default new UserRepository();
