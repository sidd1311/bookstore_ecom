import React from 'react';
import { useLocation } from 'react-router-dom';
import handlepayment from './Cashfree';

const Payment = () => {
  const location = useLocation();
  const { sessionId, orderId } = location.state;


  return (
    <div className="container">
      <h2>Payment Details</h2>
      <p>Order ID: {orderId}</p>
      <p>Session ID: {sessionId}</p>
      <button onClick={() => handlepayment(sessionId)} className="btn btn-primary mt-3 ms-2" disabled={!sessionId}>   Buy Now
        </button>
                      
    </div>
  );
};

export default Payment;
