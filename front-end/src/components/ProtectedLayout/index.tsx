import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router';

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
