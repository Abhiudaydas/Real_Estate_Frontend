import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, loading, logout } = useAuthContext();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) return null;

  return (
    <header className="header">
      <div className="container header__inner">
        {/* Logo */}
        <Link to="/" className="header__logo">
          PlotNest
        </Link>

        {/* Desktop Menu */}
        <nav className="header__nav">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/sell">Sell</Link>
          <Link to="/rent">Rent</Link>
          <Link to="/about">About</Link>

          {!user ? (
            <div className="header__auth">
              <Link to="/login" className="btn btn--outline">
                Login
              </Link>
              <Link to="/signup" className="btn btn--primary">
                Sign Up
              </Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="btn btn--danger">
              Logout
            </button>
          )}
        </nav>

        {/* Hamburger */}
        <button className="header__hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/properties" onClick={() => setOpen(false)}>
            Properties
          </Link>
          <Link to="/sell" onClick={() => setOpen(false)}>
            Sell
          </Link>
          <Link to="/rent" onClick={() => setOpen(false)}>
            Rent
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About
          </Link>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
