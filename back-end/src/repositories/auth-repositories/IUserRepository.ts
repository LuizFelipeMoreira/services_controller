import User from '../../database/model/Users';

export interface IUserRepository {
    createUser: (name: string, email: string, password: string) => Promise<User | null>;
    getUserById: (id: number) => Promise<User | null>;
    getUserByEmail: (email: string) => Promise<User | null>;
}
