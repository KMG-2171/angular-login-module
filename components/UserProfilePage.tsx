import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const UserProfilePage: React.FC = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-700 dark:text-gray-300">No user information available.</p>
        <Link to="/dashboard" className="text-brand-primary underline mt-4 inline-block">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg w-full mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <img
          src={user.avatarUrl || `https://i.pravatar.cc/100?u=${user.id}`}
          alt="avatar"
          className="h-24 w-24 rounded-full object-cover mb-4"
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {user.name || user.email}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{user.email}</p>

        {/* Future: additional profile details */}
        <div className="space-y-4 w-full">
          <button className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Edit Profile (coming soon)
          </button>
          <button className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Change Password (coming soon)
          </button>
        </div>

        <Link to="/dashboard" className="text-brand-primary underline mt-6">
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
};

export default UserProfilePage;