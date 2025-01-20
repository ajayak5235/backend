import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginCSS.css';

const BASE_URL = "https://backend-kvjar6bo9-ajay-singhs-projects-738d1bee.vercel.app"

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('data login', data);

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        setError(data.message || 'Login failed, please try again');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="login-form">
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            aria-label="Email"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            aria-label="Password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button
          onClick={handleSubmit}
          className="login-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <p style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            style={{
              backgroundColor: 'transparent',
              color: '#007BFF',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '0',
            }}
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
