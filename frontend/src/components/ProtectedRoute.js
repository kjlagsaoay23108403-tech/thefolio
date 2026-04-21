// frontend/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Usage:
// <ProtectedRoute> → requires any logged-in user
// <ProtectedRoute role='admin'> → requires admin role
const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to='/login' replace />;

  if (role && user.role !== role) return <Navigate to='/' replace />;

  // Protect against object type mismatch by forcing a React node.
  return React.isValidElement(children) ? children : <>{children}</>;
};

export default ProtectedRoute;