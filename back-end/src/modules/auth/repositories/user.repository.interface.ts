import User from '../../../database/model/user.model';

export interface UserRepositoryInterface {
    createUser: (name: string, email: string, password: string) => Promise<User | null>;
    getUserById: (id: number) => Promise<User | null>;
    getUserByEmail: (email: string) => Promise<User | null>;
}
