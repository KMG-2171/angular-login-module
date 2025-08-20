import React, { createContext, useContext, useEffect, useState } from 'react';
import * as auth from '../services/auth';
import type { UserProfile } from '../types';

interface UserContextValue {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? (JSON.parse(stored) as UserProfile) : null;
  });

  // Persist or clear localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // If we already have a token but no user (e.g., page refresh), fetch profile once
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !user) {
      auth
        .getProfile()
        .then(res => {
          const profile = res.data;
          if (profile) {
            if (!profile.avatarUrl) {
              profile.avatarUrl = `https://i.pravatar.cc/100?u=${profile.id}`;
            }
            setUser(profile);
          }
        })
        .catch(() => {
          /* ignore */
        });
    }
    // Run only once on mount; eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return ctx;
};