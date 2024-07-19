import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useContext } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import './css/Navbar.css';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/books?q=${searchQuery}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className='container-fluid'>
          <Link className="navbar-brand" to="/" style={{ fontSize: '1.5rem' }}>BookStore</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/')} me-4`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/books')} me-4`} to="/books">Books</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/about')}`} to="/about">About Us</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <form className="d-flex" onSubmit={handleSearch}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle"></i>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown" style={{ fontSize: '1.5rem' }}>
                  {isLoggedIn ? (
                    <>
                      <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                      <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                    </>
                  ) : (
                    <>
                      <li><Link className="dropdown-item" to="/login">Login</Link></li>
                      <li><Link className="dropdown-item" to="/signup">Sign Up</Link></li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
