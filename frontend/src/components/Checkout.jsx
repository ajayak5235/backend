import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { state } = useLocation(); 
  const cart = state?.cart || { items: [] }; 

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      alert('Payment successful!');
      navigate('/');
    }, 2000);
  };

  const getTotalPrice = () => {
    return cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '32px' }}>Checkout</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="name" style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              fontSize: '14px',
              marginBottom: '2px',
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="address" style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Shipping Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              fontSize: '14px',
              marginBottom: '2px',
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="cardNumber" style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '4px',
              fontSize: '14px',
              marginBottom: '2px',
            }}
          />
        </div>
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{ flex: '1', marginRight: '8px' }}>
            <label htmlFor="expiryDate" style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              placeholder="MM/YY"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                fontSize: '14px',
                marginBottom: '5px',
              }}
            />
          </div>
          <div style={{ flex: '1', marginLeft: '8px' }}>
            <label htmlFor="cvv" style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #D1D5DB',
                borderRadius: '4px',
                fontSize: '14px',
                marginBottom: '2px',
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#4F46E5',
            color: 'white',
            padding: '12px',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#4338CA')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4F46E5')}
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
