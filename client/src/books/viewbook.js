import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerDetailsForm from './customer-details';
import '../css/Rich.css';
import handlepayment from '../cashfree/Cashfree';
import { AuthContext } from '../AuthContext';
import LoginOverlay from './LoginOverlay';

const ViewBook = () => {
  const { bookId } = useParams();
  const { isLoggedIn, user, token } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');
  const [isDeliveryAvailable, setIsDeliveryAvailable] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    // Fetch book from the backend
    axios.get(`http://localhost:5000/book/${bookId}`)
      .then(response => {
        setBook(response.data);
      })
      .catch(error => {
        console.error('Error fetching book:', error);
      });
  }, [bookId]);

  const checkDelivery = () => {
    if (pincode === '123456') {
      setDeliveryStatus('Delivery available to this pincode.');
      setIsDeliveryAvailable(true);
    } else {
      setDeliveryStatus('Delivery not available to this pincode.');
      setIsDeliveryAvailable(false);
    }
  };

  const handleBuyNow = () => {
    if (isLoggedIn) {
      setShowCustomerForm(true);
    } else {
      setShowLoginOverlay(true);
    }
  };

  const handleFormSubmit = (details) => {
    setOrderDetails(details);
    setCustomerDetails({
      name: details.customer_details.customer_name,
      phone: details.customer_details.customer_phone,
      email: details.customer_details.customer_email
    });
    setShowCustomerForm(false);
    setSessionId(details.sessionId);
  };

  const handlePayment = async (sessionId) => {
    const orderData = {
      orderId: orderDetails.order_id,
      customerDetails: customerDetails, // Include customer details
      book: {
        id: book._id,
        img: book.image,
        title: book.title,
        author: book.author,
        category: book.category,
        price: book.price
      },
      sessionId: sessionId,
    };

    try {
      const response = await axios.post('http://localhost:5000/order', orderData);
      if (response.data.success) {
        handlepayment(sessionId); // Call your existing payment handling function
      } else {
        console.error('Failed to save order:', response.data.error);
      }
    } catch (error) {
      console.error('Error during payment process:', error);
    }
  };

  const handleAddToCart = async () => {
   const data = {
    bookId: book._id,
    title: book.title,
    author: book.author,
    price: book.price,
    customerDetails: customerDetails
   }

   console.log(data)
   
    try {
      const response = await axios.post('http://localhost:5000/cart/add', {
        bookId: book._id,
        title: book.title,
        author: book.author,
        price: book.price,
        customerDetails: customerDetails 
      
      // Include customer details
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming token is stored in context
        }
      });
      if (response.data.success) {
        setCartMessage('Book added to cart successfully!');
      } else {
        console.error('Failed to add book to cart:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding book to cart:', error);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="contain">
      {showLoginOverlay && (
        <LoginOverlay onClose={() => setShowLoginOverlay(false)} />
      )}
      <div className="row align-items-center">
        <div className="col-lg-3 col-md-4 col-12 mb-3 d-flex justify-content-center">
          <img src={`http://localhost:5000/${book.image}`} alt={book.title} className="img-fluid" />
        </div>
        <div className="col-lg-6 col-md-8 col-12 mb-3 text-justify">
          <p className="head">{book.title}</p>
          <p className="auth"><b>Written By:</b> {book.author}</p>
          <p className="auth"><b>Category:</b> {book.category}</p>
          <p className="sub-head">{book.tag}</p>
          <hr />
          <p className="description">{book.description}</p>
        </div>
        <div className="col-lg-3 col-md-4 col-12 mb-3 d-flex justify-content-center">
          {showCustomerForm ? (
            <div className="card">
              <h3 className="card-header">Enter Customer Details</h3>
              <div className="card-body">
                <CustomerDetailsForm book={book} onFormSubmit={handleFormSubmit} />
              </div>
            </div>
          ) : orderDetails ? (
            <div className="card">
              <h3 className="card-header">Order Details</h3>
              <div className="card-body">
                <p><b>Order ID:</b> {orderDetails.order_id}</p>
                <p><b>Name:</b> {orderDetails.customer_details.customer_name}</p>
                <p><b>Phone:</b> {orderDetails.customer_details.customer_phone}</p>
                <p><b>Email:</b> {orderDetails.customer_details.customer_email}</p>
                <button className="btn btn-secondary mt-3" onClick={() => setShowCustomerForm(true)}>
                  Edit Details
                </button>
                <button className="btn btn-primary mt-3 ms-2" onClick={() => handlePayment(sessionId)}>
                  Continue to Payment
                </button>
              </div>
            </div>
          ) : (
            <div className="card">
              <h3 className="card-header">Buy Now</h3>
              <div className="card-body">
                <h5 className="card-title">PaperBack: {book.price}</h5>
                <p className="card-text">Inclusive of All taxes</p>
                <div className="pincode-checker mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <button className="btn btn-secondary mt-2" onClick={checkDelivery}>
                    Check Delivery
                  </button>
                  <p className={`delivery-status mt-2 ${isDeliveryAvailable ? 'text-success' : 'text-danger'}`}>
                    {deliveryStatus}
                  </p>
                </div>
                <button className="btn btn-success mt-3 me-2" onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button onClick={handleBuyNow} className="btn btn-primary mt-3 ms-2">
                  Buy Now
                </button>
                {cartMessage && <p className="mt-3">{cartMessage}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
