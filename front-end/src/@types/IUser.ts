export interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

export type IUser = Omit<IUserRequest, 'password'>;
