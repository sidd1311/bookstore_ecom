import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import '../css/profile-nav.css';

const Profile_nav = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top mb-5">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">BookStore</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Profile Navigation</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav nav-underline justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    to="/profile"
                  >
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    to="/profile/orders"
                  >
                    Orders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    to="/profile/wishlist"
                  >
                    Wishlist
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    to="/profile/cart"
                  >
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    to="/profile/update"
                  >
                    Update Profile
                  </NavLink>
                </li>
              </ul>
              <form className="d-flex mt-3" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <div className = "margin-below"></div>
      <Outlet />
    </>
  );
};

export default Profile_nav;
