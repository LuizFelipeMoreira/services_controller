import { IUser } from '../../@types/IUser';
import User from '../../model/Users';

export interface IUserRepository {
    createUser: (email: string, password: string) => Promise<User | null>;
    getUserById: (id: number) => Promise<User | null>;
    getUserByEmail: (email: string) => Promise<User | null>;
}
