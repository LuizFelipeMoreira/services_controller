import React from 'react';
import { IUserRequest, IUserResponse } from '../@types/IUser';
import { LOGIN_USER } from '../api/handleRequests';

interface AuthContext {
  children: React.ReactNode;
}

interface IAuthContext {
  user: IUserResponse | null;
  errorMessage: string;
  loginUser: (data: IUserRequest) => void;
  logout: () => void;
}

export const AuthContext = React.createContext({} as IAuthContext);

export const AuthContextProvider = ({ children }: AuthContext) => {
  const [user, setUser] = React.useState<IUserResponse | null>(null);
  const [errorMessage, setErrorMessge] = React.useState<string>('');

  const loginUser = async (data: IUserRequest) => {
    try {
      const user = await LOGIN_USER(data.email, data.password);

      localStorage.setItem('token', user.token);
      setUser(user);
    } catch (error: any) {
      setErrorMessge(error.response.data.message);
      console.log('Deu erro no bgl: ' + errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, errorMessage, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
