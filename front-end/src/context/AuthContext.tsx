import React from 'react';
import { IUserPayLoad, IUserRequest, IUserResponse } from '../@types/IUser';
import { GET_ME, LOGIN_USER } from '../api/handleRequests';
import { AxiosError } from 'axios';

interface AuthContext {
  children: React.ReactNode;
}

interface IAuthContext {
  user: IUserResponse | null | IUserPayLoad;
  errorMessage: string;
  loginUser: (data: IUserRequest) => void;
  getMeUser: () => void;
  logout: () => void;
}

export const AuthContext = React.createContext({} as IAuthContext);

export const AuthContextProvider = ({ children }: AuthContext) => {
  const [user, setUser] = React.useState<IUserResponse | null | IUserPayLoad>(
    null
  );
  const [errorMessage, setErrorMessge] = React.useState<string>('');

  const loginUser = async (data: IUserRequest) => {
    try {
      const user = await LOGIN_USER(data.email, data.password);

      localStorage.setItem('token', user.token);
      setUser(user);
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        setErrorMessge(error.response?.data.message);
    }
  };

  const getMeUser = async () => {
    try {
      const userPayload = await GET_ME();

      if (userPayload.id) setUser(userPayload);
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        setErrorMessge(error.response?.data.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{ user, errorMessage, loginUser, logout, getMeUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
