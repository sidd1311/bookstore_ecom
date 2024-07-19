import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import '../css/LoginOverlay.css'; // Create a CSS file to style the overlay

const LoginOverlay = ({ onClose }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      login(response.data.token);
      onClose();
      navigate(location.pathname); // Redirect to the current page
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Error logging in. Please try again.');
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-overlay-content">
        <h3>Login to Continue</h3>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <button className="btn btn-secondary mt-3 w-100" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginOverlay;
