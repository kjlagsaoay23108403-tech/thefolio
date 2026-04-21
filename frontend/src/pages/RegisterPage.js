// frontend/src/pages/RegisterPage.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import Header from '../components/Header';

const RegisterPage = ({ toggleDarkMode, darkMode }) => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError('Please enter your full name.');
      return false;
    }
    
    if (!form.email.trim()) {
      setError('Please enter your email address.');
      return false;
    }
    
    if (!form.password) {
      setError('Please enter a password.');
      return false;
    }
    
    if (!form.confirmPassword) {
      setError('Please confirm your password.');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      const { data } = await API.post('/auth/register', {
        name: form.name.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password
      });

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      navigate('/home');
    } catch (err) {
      const message = err.response?.data?.message || 
                     err.response?.data?.error ||
                     'Registration failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="register-page">
        <div className="register-container">
          <div className="register-header">
            <h2>Create an Account</h2>
            <p>Join TheFolio community today</p>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
                required
                autoFocus
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex="-1"
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="password-requirements">
              <p>Password requirements:</p>
              <ul>
                <li className={form.password.length >= 6 ? 'valid' : ''}>
                  ✓ At least 6 characters
                </li>
                <li className={form.password === form.confirmPassword && form.password ? 'valid' : ''}>
                  ✓ Passwords match
                </li>
              </ul>
            </div>

            <button 
              type="submit" 
              className="btn-register"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner">
                  <span className="spinner"></span>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>

          <div className="terms">
            <p>
              By creating an account, you agree to our{' '}
              <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;