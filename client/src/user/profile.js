import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Orders.css'; // Import the CSS file

const Profile_home = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const fetchedUserId = decodedToken.id;
        setUserId(fetchedUserId);
      }
    }
  }, [isLoggedIn]);

  return (
    <div className="orders-page container mt-5">
      <h1 className="mb-4">Your Account</h1>
      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">View your recent orders.</p>
              <a href="/profile/orders" className="btn btn-primary">Go to Orders</a>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Cart</h5>
              <p className="card-text">View and manage items in your cart.</p>
              <a href="#" className="btn btn-primary">Go to Cart</a>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Wishlist</h5>
              <p className="card-text">View and manage items in your wishlist.</p>
              <a href="#" className="btn btn-primary">Go to Wishlist</a>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Update Profile</h5>
              <p className="card-text">Update your profile information.</p>
              <a href="profile/update" className="btn btn-primary">Update Profile</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_home;
