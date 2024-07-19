  import React, { useState, useContext, useEffect } from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import axios from 'axios';
  import { useNavigate } from "react-router-dom";
  import { AuthContext } from '../AuthContext';

  export default function Signup() {
    const { isLoggedIn, login } = useContext(AuthContext);
    const [f_name, setFName] = useState('');
    const [l_name, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
      if (isLoggedIn) {
        navigate('/');
      }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    
      try {
        const response = await axios.post('http://localhost:5000/signup', {
          f_name,
          l_name,
          email,
          mobile,
          password,
          confirmPassword // Add confirmPassword here
        });
    
        if (response.data.success) {
          login(response.data.token); // Log the user in
          setSuccess('Signup successful! Redirecting to home...');
          setError('');
          setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
        } else {
          setError(response.data.message);
          setSuccess('');
        }
      } catch (error) {
        console.error('Error signing up:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred during signup. Please try again.');
        }
        setSuccess('');
      }
    };
       

    return (
      <div className="container mt-5">
        <div className="card p-4 mx-auto"  style={{ width: '30rem', fontSize : '1.6rem' }}>
          <h2 className="mb-4 text-center">Sign Up</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="f_name" className="form-label">First Name</label>
              <input type="text" className="form-control" id="f_name" placeholder="John" value={f_name} onChange={(e) => setFName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="l_name" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="l_name" placeholder="Doe" value={l_name} onChange={(e) => setLName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input type="tel" className="form-control" id="mobile" placeholder="123-456-7890" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
