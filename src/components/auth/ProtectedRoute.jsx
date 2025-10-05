// src/components/ProtectedRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, initialized } = useSelector((s) => s.user);
  if (!initialized) return null; // or a spinner
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
