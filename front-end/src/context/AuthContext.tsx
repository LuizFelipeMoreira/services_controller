import React from 'react';
import { IUser, IUserRequest } from '../@types/IUser';
import { LOGIN_USER } from '../api/handleRequests';

interface AuthContext {
  children: React.ReactNode;
}

interface IAuthContext {
  user: IUser | null;
  loginUser: (data: IUserRequest) => void;
  logout: () => void;
}

export const AuthContext = React.createContext({} as IAuthContext);

export const AuthContextProvider = ({ children }: AuthContext) => {
  const [user, setUser] = React.useState<IUser | null>(null);

  const loginUser = async (data: IUserRequest) => {
    const user = await LOGIN_USER(data.email, data.password);

    if (user) console.log(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
