import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const fetchedUserId = decodedToken.id;
        setUserId(fetchedUserId);
        fetchOrders(fetchedUserId);
      }
    }
  }, [isLoggedIn]);

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/orders/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="alert alert-primary">Your Orders</h1>
      <div className="row">
        {orders.length === 0 ? (
          <div className="col">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src="..." className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">No Orders Found</h5>
                    <p className="card-text">You have not placed any orders yet.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="mb-4">
              <div className='new'>
              <div className="card order-card">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={`http://localhost:5000/${order.book.img}`} className="img-fluid rounded-start order-image" alt={order.book.title} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{order.book.title}</h5>
                      <p className="card-text"><strong>Order ID:</strong> {order.orderId}</p>
                      <p className="card-text"><strong>Price:</strong> ${order.book.price}</p>
                      <p className="card-text"><small className="text-body-secondary">Placed at: {new Date(order.createdAt).toLocaleString()}</small></p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
