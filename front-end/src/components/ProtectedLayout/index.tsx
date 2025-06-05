import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router';

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return children;
};
