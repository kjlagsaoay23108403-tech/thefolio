// frontend/src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data if token exists
  const fetchUser = async () => {
    try {
      const { data } = await API.get('/auth/me');
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
      delete API.defaults.headers.common['Authorization'];
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // On app load: if a token exists, set auth header and fetch user
  useEffect(() => {
    let token = null;

    try {
      token = localStorage.getItem('token');
    } catch (err) {
      console.warn('Unable to access localStorage for token', err);
    }

    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Login: call backend, save token, set auth header, store user
  const login = async (email, password) => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      
      try {
        localStorage.setItem('token', data.token);
      } catch (err) {
        console.warn('Unable to persist auth token in localStorage', err);
      }
      
      API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  // Register: call backend, save token, set auth header, store user
  const register = async (userData) => {
    try {
      const { data } = await API.post('/auth/register', userData);
      
      try {
        localStorage.setItem('token', data.token);
      } catch (err) {
        console.warn('Unable to persist auth token in localStorage', err);
      }
      
      API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setUser(data.user);
      return data.user;
    } catch (error) {
      throw error;
    }
  };

  // Logout: clear token and user from memory and storage
  const logout = () => {
    try {
      localStorage.removeItem('token');
    } catch (err) {
      console.warn('Unable to clear auth token from localStorage', err);
    }
    
    delete API.defaults.headers.common['Authorization'];
    setUser(null);
  };

  // Don't render children until loading is complete
  if (loading) {
    return null; // Or return a loading spinner if you prefer
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};