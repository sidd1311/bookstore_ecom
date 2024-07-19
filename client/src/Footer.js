import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/footer.css'

const Footer = () => {
    return (
        <div className="footer">
        <nav className="navbar navbar-dark fixed-bottom bg-dark">
            <div className="container-fluid text-center">
                <span className="navbar-text mx-auto">
                    &copy; {new Date().getFullYear()} Book Haven. All rights reserved.
                </span>
            </div>
        </nav>
            </div>
    );
};

export default Footer;
