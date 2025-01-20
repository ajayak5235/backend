import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const BASE_URL = "https://backend-kvjar6bo9-ajay-singhs-projects-738d1bee.vercel.app"

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/products?limit=4`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFeaturedProducts(data);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      toast.error('Failed to load featured products. Please try again later.');
    }
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add product to cart. Status: ${response.status}`);
      }

      toast.success('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart. Please try again.');
    }
  };

  const handleLogin = () => {
    localStorage.setItem('token', 'your_token_here'); 
    window.location.reload();
  };

  return (
    <div className="home">
      <ToastContainer position="top-center" />
      <header className="hero">
        <h1>Welcome to ShopEase</h1>
        <p>Find the best products at the best prices!</p>
      </header>
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.length > 0 ? (
            featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </section>
      <section className="cta">
        <h2>Start Shopping Now</h2>
        <p>Discover our wide range of products and unbeatable deals.</p>
        <a href="/products" className="cta-button">Shop All Products</a>
      </section>
    </div>
  );
}

export default Home;


