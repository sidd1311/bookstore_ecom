// OrderDetailsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/details/${id}`); // Adjust the API endpoint
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (!orderDetails) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h1 className="alert alert-primary">Order Details</h1>
      <div className="row">
        <div className="col-md-4">
          <img src={`http://localhost:5000/${orderDetails.book.img}`} className="img-fluid rounded-start" alt={orderDetails.book.title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{orderDetails.book.title}</h5>
            <p className="card-text"><strong>Order ID:</strong> {orderDetails.orderId}</p>
            <p className="card-text"><strong>Price:</strong> ${orderDetails.book.price}</p>
            <p className="card-text"><small className="text-body-secondary">Placed at: {new Date(orderDetails.createdAt).toLocaleDateString()}</small></p>
            <p className="card-text"><strong>Customer ID:</strong> {orderDetails.customerId}</p>
            <p className="card-text"><strong>Customer Details:</strong> {orderDetails.customerDetails}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
