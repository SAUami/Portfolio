import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser, AuthResponse } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('saurabh_admin_token');
    const savedUser = localStorage.getItem('saurabh_admin_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('saurabh_admin_token');
        localStorage.removeItem('saurabh_admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const rawApiBase = import.meta.env.VITE_API_BASE_URL || '';
      const apiBase = rawApiBase.trim().replace(/\/+$/, '');
      const response = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });

      let data: AuthResponse;
      try {
        data = await response.json();
      } catch {
        return {
          success: false,
          message: `The server responded with an unexpected format (Status: ${response.status}). Please verify your backend URL.`,
        };
      }

      if (response.ok && data.success && data.token && data.user) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('saurabh_admin_token', data.token);
        localStorage.setItem('saurabh_admin_user', JSON.stringify(data.user));
        return { success: true };
      }

      return {
        success: false,
        message: data.message || 'Invalid email or password. Please verify your credentials.',
      };
    } catch (err) {
      const target = import.meta.env.VITE_API_BASE_URL || 'default /api';
      const detail = err instanceof Error ? ` (${err.message})` : '';
      return {
        success: false,
        message: `Could not reach backend at "${target}"${detail}. Note: Render free tier may take 50s to wake up from sleep.`,
      };
    }
  };

  const logout = () => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    if (token) {
      fetch(`${apiBase}/api/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch(() => {});
    }

    setToken(null);
    setUser(null);
    localStorage.removeItem('saurabh_admin_token');
    localStorage.removeItem('saurabh_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
