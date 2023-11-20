import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { UserContextType } from '../interfaces/User';

const ProtectedRoute = ({ redirectPath, children }) => {
  const {
    userState: { isAuthenticated },
  } = useContext(UserContext) as UserContextType;

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
