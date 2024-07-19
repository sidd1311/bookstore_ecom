import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode

import fetchUser from '../user/fetchuser';

const CustomerDetailsForm = ({ book, onFormSubmit }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({});
  const [userid, setUserid] = useState('')

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      setUserid(userId)
      fetchUserProfile(userId);
    }
  }, [isLoggedIn]);

  const fetchUserProfile = async (userId) => {
    try {
      const userProfile = await fetchUser(userId);
      setUser(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const generateOrderId = () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 1000000);
    return `order_${timestamp}_${randomNum}`;
  };

  const formatPrice = (price) => {
    return parseFloat(price.replace(/[^0-9.]/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const orderId = generateOrderId();
    const orderAmount = formatPrice(book.price);
    const customerId = userid;

    const orderDetails = {
      order_id: orderId,
      order_amount: orderAmount,
      customer_details: {
        customer_id: customerId,
        customer_name: `${user.firstName} ${user.lastName}`,
        customer_phone: user.mobile,
        customer_email: user.email,
      },
    };

    try {
      const response = await axios.post('http://localhost:5000/create-session', orderDetails);
      onFormSubmit({ ...orderDetails, sessionId: response.data.payment_session_id });
    } catch (error) {
      console.error('Error creating session:', error.response ? error.response.data : error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <p>{`${user.firstName} ${user.lastName}`}</p>
        </div>
        <div className="form-group">
          <label>Phone</label>
          <p>{user.mobile}</p>
        </div>
        <div className="form-group">
          <label>Email</label>
          <p>{user.email}</p>
        </div>
        <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
        </button>
      </form>
    </div>
  );
};

export default CustomerDetailsForm;
