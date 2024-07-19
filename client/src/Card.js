import React from 'react';
import './css/Card.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
  return (
    <Link to={props.link}>
      <div className='Book-Cards'>
      <div className="card">
        <div className="card-img-container">
          <img src={props.url1} className="card-img-top" alt={props.text1} />
          <div className="card-overlay">
            <h5 className="card-title">{props.text1}</h5>
            <p className="card-author"><b>Author:</b> {props.author}</p>
            <p className="card-genre"><b>Genre:</b> {props.genre}</p>
            <p className="card-price"><b>Price:</b> {props.price}</p>
          </div>
        </div>
      </div>
      </div>
    </Link>
  );
};

export default Card;
