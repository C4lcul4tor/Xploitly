import React, { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const isAdmin = localStorage.getItem('admin-auth') === 'true';

  if (!isAdmin) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
