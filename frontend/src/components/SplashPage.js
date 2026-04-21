// frontend/src/pages/SplashPage.js
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SplashPage = () => {
  const { user } = useAuth();

  // Optional: Redirect authenticated users to home page
  // if (user) {
  //   return <Navigate to="/home" replace />;
  // }

  return (
    <div className="splash-page">
      <div className="splash-container">
        <h1>Welcome to TheFolio</h1>
        <p className="splash-description">
          A community blog where members share ideas, stories, and inspiration.
        </p>

        <div className="splash-actions">
          <Link to="/home" className="btn-primary">
            Browse Posts
          </Link>

          {!user && (
            <div className="button-group">
              <Link to="/register" className="btn-secondary">
                Create Account
              </Link>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
            </div>
          )}

          {user && (
            <div className="button-group">
              <Link to="/create" className="btn-secondary">
                Write a Post
              </Link>
              <button 
                onClick={() => {/* Optional: Add quick action */}}
                className="btn-outline"
              >
                Continue as {user.name || 'User'}
              </button>
            </div>
          )}
        </div>

        {!user && (
          <p className="splash-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SplashPage;