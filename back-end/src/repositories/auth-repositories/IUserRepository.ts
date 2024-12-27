import { IUser } from '../../@types/IUser';
import User from '../../model/Users';

export interface IUserRepository {
    createUser: ({ password, email, name }: IUser) => Promise<User | null>;
    getUserById: (id: number) => Promise<User | null>;
    getUserByEmail: (email: string) => Promise<User | null>;
}
