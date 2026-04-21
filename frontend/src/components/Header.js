// frontend/src/components/Header.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ toggleDarkMode, darkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <h1>✏️ My Drawing Portfolio</h1>
      <nav>
        <NavLink to="/home" className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
          Contact
        </NavLink>
        
        {!user && (
          <>
            <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
              Register
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
              Login
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink to="/create" className={({ isActive }) => isActive ? 'active' : ''}>
              Write Post
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
              Profile
            </NavLink>
            {user.role === 'admin' && (
              <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
                Admin
              </NavLink>
            )}
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </nav>
      <button id="darkModeBtn" onClick={toggleDarkMode}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  );
};

export default Header;