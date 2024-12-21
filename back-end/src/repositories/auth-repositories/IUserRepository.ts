import { User } from '../../@types/UserType';

export interface IUserRepository {
    createUser: () => Promise<User>;
    getUserById: (id: number) => Promise<User | null>;
    getUserByEmail: (email: string) => Promise<User | null>;
}
