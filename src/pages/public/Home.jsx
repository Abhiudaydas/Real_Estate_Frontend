import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Find Your Dream Property</h1>
            <p>
              Discover the perfect home or investment opportunity with PlotNest
            </p>
            <div className="hero-buttons">
              <Link to="/properties" className="btn btn-primary btn-large">
                Browse Properties
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose PlotNest?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏠</div>
              <h3>Wide Selection</h3>
              <p>Browse through thousands of verified properties</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Verified Listings</h3>
              <p>All properties are verified by our team</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Prime Locations</h3>
              <p>Properties in the best neighborhoods</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing and great deals</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied users on PlotNest</p>
            <Link to="/properties" className="btn btn-primary btn-large">
              Explore Properties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
