import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - accept any email/password for demo
      const { email, password } = credentials;
      
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Create mock user based on email
      const userData = {
        _id: 'mock-user-' + Date.now(),
        email: email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        role: email.includes('admin') ? 'admin' : email.includes('provider') ? 'provider' : 'client',
        isProvider: email.includes('provider'),
        createdAt: new Date().toISOString()
      };
      
      const mockToken = 'mock-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setToken(mockToken);
      setUser(userData);
      
      return {
        success: true,
        message: 'Login successful',
        data: {
          token: mockToken,
          user: userData
        }
      };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { email, password, name, role = 'client' } = userData;
      
      if (!email || !password || !name) {
        throw new Error('Name, email and password are required');
      }
      
      // Check if email already exists (simple mock validation)
      const existingUser = localStorage.getItem('registered_emails');
      const registeredEmails = existingUser ? JSON.parse(existingUser) : [];
      
      if (registeredEmails.includes(email)) {
        throw new Error('Email already registered');
      }
      
      // Add email to registered list
      registeredEmails.push(email);
      localStorage.setItem('registered_emails', JSON.stringify(registeredEmails));
      
      // Create new user
      const newUser = {
        _id: 'mock-user-' + Date.now(),
        email,
        name,
        role,
        isProvider: role === 'provider',
        createdAt: new Date().toISOString()
      };
      
      const mockToken = 'mock-token-' + Date.now();
      
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setToken(mockToken);
      setUser(newUser);
      
      return {
        success: true,
        message: 'Registration successful',
        data: {
          token: mockToken,
          user: newUser
        }
      };
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const isAuthenticated = !!token && !!user;
  const isProvider = user?.role === 'provider';
  const isAdmin = user?.role === 'admin';

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated,
    isProvider,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 