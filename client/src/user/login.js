    import React, { useState, useContext, useEffect } from 'react';
    import '../css/login.css';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom';
    import { AuthContext } from '../AuthContext';

    export default function Login() {
    const { isLoggedIn, login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isLoggedIn) {
        navigate('/');
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('http://localhost:5000/login', { email, password });
        console.log('Login successful:', response.data);
        const em = response.data.existUser;
        const mail = em.email;
        if (mail === email) {
            login(response.data.token);
            setSuccessMessage('Login successful!');
            setErrorMessage('');
            console.log('JWT Token:', em);
        }
        } catch (error) {
        console.error('There was an error logging in:', error);
        const errorMsg = error.response ? error.response.data.message : 'There was an error logging in. Please try again.';
        setErrorMessage(errorMsg);
        setSuccessMessage('');
        }
    };

    return (
        <div className="container mt-5">
        <div className="d-flex justify-content-center">
            <div className="card logincard shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '28rem' }}>
            <h5 className="text-center" style={{ fontSize: '2rem' }}>Login</h5>
            <div className="card-body">
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleSubmit}>
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
                <button className="btn btn-primary w-100" type="submit">Login</button>
                </form>
                <div className="text-center mt-3">
                New Here? <a href="/signup">Register Now</a>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    }
