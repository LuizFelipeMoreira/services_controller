import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router';

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const { user, getMeUser } = useAuth();
  const token = localStorage.getItem('token');

  useEffect(() => {}, []);

  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
