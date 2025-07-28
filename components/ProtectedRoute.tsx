import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('authToken');

  // If a token exists, render the nested route (e.g., Dashboard). Otherwise, redirect to login.
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
