import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <h1 onClick={() => navigate('/')}>ShopEase</h1>
      <div className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <nav>
        <ul className={`nav-list ${isMenuOpen ? 'show' : ''}`}>
          <h1 className="nav-item">
            <Link to="/" className="nav-link" onClick={toggleMenu}>
              Home
            </Link>
          </h1>
          <h1 className="nav-item">
            <Link to="/products" className="nav-link" onClick={toggleMenu}>
              Products
            </Link>
          </h1>
          {isLoggedIn && (
            <h1 className="nav-item">
              <Link to="/cart" className="nav-link" onClick={toggleMenu}>
                Cart
              </Link>
            </h1>
          )}
           {(
            <h1 className="nav-item">
              <Link to="/admin" className="nav-link" onClick={toggleMenu}>
                Dashboard
              </Link>
            </h1>
          )}
          {isLoggedIn ? (
  <h1 className="nav-item">
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#ff4d4d",
        color: "white",
        border: "none",
        padding: "5px 10px",
        fontSize: "16px",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
    >
      Logout
    </button>
  </h1>
) : (
  <h1 className="nav-item">
    <Link
      to="/login"
      onClick={toggleMenu}
      style={{
        backgroundColor: "green",
        color: "white",
        border: "none",
        padding: "5px 10px",
        fontSize: "16px",
        borderRadius: "5px",
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-block",
        textAlign: "center",
        transition: "background-color 0.3s ease",
      }}
    >
      Login
    </Link>
  </h1>
)}

        </ul>
      </nav>
    </header>
  );
}

export default Navbar;

