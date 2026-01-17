import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { logoutUser } from "../../api/auth.api";

const Navbar = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            PlotNest
          </Link>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>

          <div className={`navbar-menu ${mobileMenuOpen ? "active" : ""}`}>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/properties" className="nav-link">
              Properties
            </Link>

            {user ? (
              <>
                {user.role === "ADMIN" ? (
                  <>
                    <Link to="/admin" className="nav-link">
                      Dashboard
                    </Link>
                    <Link to="/admin/properties" className="nav-link">
                      Manage Properties
                    </Link>
                    <Link to="/admin/users" className="nav-link">
                      Users
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/user" className="nav-link">
                      Dashboard
                    </Link>
                    <Link to="/user/my-properties" className="nav-link">
                      My Properties
                    </Link>
                    <Link to="/user/add-property" className="nav-link">
                      Add Property
                    </Link>
                  </>
                )}
                <span className="nav-user">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary btn-small"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary btn-small">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
