import React from "react";
import "./css/About.css";

const About = () => {
  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center mb-4">About Us</h1>

      <div className="about-section">
        <h2>Our Vision</h2>
        <p>
          At Book Haven, our vision is to provide easy access to a wide range of books for readers worldwide. We aim to create a seamless and enjoyable shopping experience while fostering a community that celebrates literature and learning.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission at Book Haven is to connect readers with their next favorite books. We promote lifelong reading habits and literacy by offering diverse selections and personalized recommendations.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Customer First:</strong> We prioritize customer satisfaction by offering exceptional service and support.</li>
          <li><strong>Quality Commitment:</strong> We ensure that every book we offer meets high standards of quality.</li>
          <li><strong>Community:</strong> We believe in building a community around books, encouraging discussions and sharing of knowledge.</li>
          <li><strong>Innovation:</strong> We embrace innovation to enhance the reading experience and improve our services continuously.</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <p>
          Book Haven stands out for its commitment to affordability, quality, and customer satisfaction. We offer free delivery, 24/7 customer support, and ensure top-quality books at affordable prices.
        </p>
      </div>

      <div className="text-center mt-5">
        <p className="text-muted">&copy; 2024 Book Haven. All rights reserved.</p>
      </div>
    </div>
  );
};

export default About;
