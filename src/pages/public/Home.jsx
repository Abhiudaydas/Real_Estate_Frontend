import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page-home">
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>Find Your Perfect Property</h1>
          <p>Buy, sell, or rent properties with ease.</p>

          <Link to="/properties" className="btn btn--primary">
            Browse Properties
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="features container">
        <div className="feature">Verified Listings</div>
        <div className="feature">Trusted Sellers</div>
        <div className="feature">Secure Platform</div>
      </section>
    </div>
  );
};

export default Home;
