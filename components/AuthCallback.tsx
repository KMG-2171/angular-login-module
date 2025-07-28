import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Store the token. localStorage is used for simplicity.
      localStorage.setItem('authToken', token);
      
      // Redirect to the dashboard after successful login
      navigate('/dashboard');
    } else {
      // Handle cases where the token is missing
      console.error('Authentication failed: No token received.');
      navigate('/?error=auth_failed');
    }
  }, [searchParams, navigate]);

  return (
    <div className="text-center text-gray-700 dark:text-gray-300">
      <p className="text-xl font-semibold">Authenticating...</p>
      <p>Please wait, we're signing you in.</p>
    </div>
  );
};

export default AuthCallback;
