import React from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/');
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive
        ? 'bg-brand-primary text-white'
        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`;

  return (
    <nav className="w-full bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex space-x-4">
            <NavLink to="/dashboard" className={linkClasses} end>
              Dashboard
            </NavLink>
            <NavLink to="/products" className={linkClasses}>
              Products
            </NavLink>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/profile" className="flex items-center space-x-2">
                <img
                  src={user.avatarUrl || `https://i.pravatar.cc/40?u=${user.id}`}
                  alt="avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user.name || user.email}
                </span>
              </Link>
            ) : null}
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;