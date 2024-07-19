import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './css/Home.css'; // Import your custom CSS file

import pic1 from './css/Person-sitting.png'; // Placeholder image path

const Home = () => {
  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books'); // Replace with your backend endpoint
        setTopBooks(response.data.slice(0, 3)); // Limit to 3 books
      } catch (error) {
        console.error('Error fetching top books:', error);
      }
    };

    fetchTopBooks();
  }, []);

  return (
    <>
      <div className='home-container'>
        <div className='home-top-section'>
          <div className="row w-100">
            <div className="col-sm-4 d-flex flex-column justify-content-center home-htext">
              <p className="home-text">Too lazy to go to library?</p>
              <p className="home-text">Grab a book</p>
              <Link to="/books" className="home-explore-button">Explore Now</Link>
            </div>
            <div className="col d-flex justify-content-end">
              <img src={pic1} className='home-img' alt="Person sitting" />
            </div>
          </div>
        </div>
      </div>

      <div className="home-black-section">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <div className="home-feature">
                <i className="fa fa-inr"></i>
                <p>Affordable Price</p>
              </div>
            </div>
            <div className="col">
              <div className="home-feature">
                <i className="fa fa-phone"></i>
                <p>24*7 Customer Support</p>
              </div>
            </div>
            <div className="col">
              <div className="home-feature">
                <i className="fa fa-truck"></i>
                <p>Free Delivery</p>
              </div>
            </div>
            <div className="col">
              <div className="home-feature">
                <i className="fa fa-star"></i>
                <p>Top Quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='home-top-books'>
        <p className='home-book-text'>Top Rated Books</p>

        <div className="home-card-group card-group">
          {topBooks.map(book => (
            <div key={book._id} className="card home-card">
              <img src={`http://localhost:5000/${book.image}`} className="card-img-top" alt={book.title} />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.price}</p>
                <Link to={`/book/${book._id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
