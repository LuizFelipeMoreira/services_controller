export interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

export type IUser = Omit<IUserRequest, 'password'>;

export interface IUserResponse {
  token: string;
  id: number;
  name: string;
  iat: number;
  exp: number;
}

export interface IUserPayLoad {
  id: number;
  name: string;
  iat: number;
  exp: number;
}
