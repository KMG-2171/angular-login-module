import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <NavBar />
      {/* Add top padding to avoid content being hidden behind the fixed navbar */}
      <div className="w-full pt-20">
        <Outlet />
      </div>
    </>
  );
};

export default ProtectedRoute;
