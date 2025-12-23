export interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

export type IUser = Omit<IUserRequest, 'password'>;

export interface IUserResponse {
  token: string;
  user: IUser;
  iat: number;
  exp: number;
}
