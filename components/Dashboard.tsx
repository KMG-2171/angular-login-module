import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to the Dashboard!</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">You have successfully logged in.</p>
      <button
        onClick={handleLogout}
        className="mt-6 px-6 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
