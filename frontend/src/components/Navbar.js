// frontend/src/components/Navbar.js
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">TheFolio</Link>
      </div>

      <div className="navbar-links">
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
          </>
        )}

        <button 
          onClick={toggleDarkMode} 
          className="dark-mode-toggle"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;