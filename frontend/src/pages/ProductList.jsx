import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const BASE_URL = "https://backend-kvjar6bo9-ajay-singhs-projects-738d1bee.vercel.app"

function ProductList() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const productsPerPage = 4;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products. Please try again later.', { position: toast.POSITION.TOP_CENTER });
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add product to cart. Status: ${response.status}`);
      }

      toast.success('Product added to cart!', { position: 'top-center' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart. Please try again.', { position: 'top-center' });
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      (category === '' || product.category === category) &&
      (product.price >= priceRange.min && product.price <= priceRange.max)
  );

  const handlePriceChange = (e, type) => {
    const value = e.target.value ? parseFloat(e.target.value) : 0;
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="product-list">
      <ToastContainer />
      <h2>Our Products</h2>

      {/* Filters Section */}
      <div className="filters">
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>
        <div>
          <label>Price Range:</label>
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) => handlePriceChange(e, 'min')}
          />
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max === Infinity ? '' : priceRange.max}
            onChange={(e) => handlePriceChange(e, 'max')}
          />
        </div>
      </div>

      {/* Product List */}
      {isLoading ? (
        <div className="spinner">Loading products...</div>
      ) : (
        <div className="product-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;


