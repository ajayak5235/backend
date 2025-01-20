import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Productstyle.css';

function ProductCard({ product, addToCart }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAddToCart = (productId) => {
    if (isLoggedIn) {
      addToCart(productId);
    } else {
      navigate('/login'); 
    }
  };

  return (
    <div className="product-card">
      <img 
        src={product.image || "/placeholder.svg"} 
        alt={product.name} 
      />
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <p className="price">Price: ${product.price}</p>
      <button 
        onClick={() => handleAddToCart(product._id)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
