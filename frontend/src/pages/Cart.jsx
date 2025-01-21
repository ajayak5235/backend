import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const BASE_URL = "https://backend-kvjar6bo9-ajay-singhs-projects-738d1bee.vercel.app"

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${BASE_URL}/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
        
      const token = localStorage.getItem('token');
      await fetch(`${BASE_URL}/api/cart/increase/${productId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchCart();
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const getTotalPrice = () => {
    return cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  return (
    <div className="container">
      <h2 className="title">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.product._id} className="cart-item">
              <div className="item-details">
                <h3 className="item-name">{item.product.name}</h3>
                <p className="item-text">Quantity: {item.quantity}</p>
                <p className="item-text">
                  Price: ${item.product.price * item.quantity}
                </p>
              </div>
              <div className="item-actions">
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="remove-button"
                >
                  Remove
                </button>
                <button
                  onClick={() => increaseQuantity(item.product._id)}
                  className="increase-button"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="total-section">
            <h3 className="total-text">Total: ${getTotalPrice()}</h3>
            <button onClick={handleCheckout} className="checkout-button">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;







