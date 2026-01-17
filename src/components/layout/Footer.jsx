import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PlotNest</h3>
            <p>Your trusted real estate platform</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/properties">Properties</Link>
            <Link to="/login">Login</Link>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@plotnest.com</p>
            <p>Phone: +91 1234567890</p>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 PlotNest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
