import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailPage from './pages/PostDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import './styles/App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;

    try {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    } catch (err) {
      console.warn('Cannot access localStorage for theme; defaulting to light mode', err);
      return false;
    }
  });

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    try {
      localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    } catch (err) {
      console.warn('Unable to persist theme preference to localStorage', err);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
          <Route path="/about" element={<AboutPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
          <Route path="/contact" element={<ContactPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
          <Route path="/register" element={<RegisterPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
          <Route path="/login" element={<LoginPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
          <Route path="/posts/:id" element={<PostDetailPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />} />
          
          <Route 
            path="/create" 
            element={
              <ProtectedRoute>
                <CreatePostPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
              </ProtectedRoute>
            } 
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPage toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;