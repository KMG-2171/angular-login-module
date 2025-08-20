import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from './contexts/ConfigContext';
import { UserProvider } from './contexts/UserContext';
import LoginModule from './components/LoginModule';
import AuthCallback from './components/AuthCallback';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ProductsPage from './components/ProductsPage';
import ProductDetailPage from './components/ProductDetailPage';
import UserProfilePage from './components/UserProfilePage';

const App: React.FC = () => {
  return (
    // The ConfigProvider now manages its own state, simplifying the App component.
    // Any child component can now call `useConfig()` to get and set the configuration.
    <ConfigProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
            <Routes>
              {/* LoginModule can now access config, t, and setConfig via the useConfig() hook */}
              <Route path="/" element={<LoginModule />} />
              
              {/* The callback route from your backend */}
              <Route path="/auth-callback" element={<AuthCallback />} />
              
              {/* All routes inside ProtectedRoute require authentication */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
              </Route>

              {/* Redirect any other path to the login page */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </ConfigProvider>
  );
};

export default App;