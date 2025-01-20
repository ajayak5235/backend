import React, { useState, useEffect } from 'react';
import './Admin.css'

const BASE_URL = "https://backend-kvjar6bo9-ajay-singhs-projects-738d1bee.vercel.app"

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const apiBaseUrl = `${BASE_URL}/api/products`;

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await fetch(apiBaseUrl);
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
      } else {
        setError(data.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError('An error occurred while fetching products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingProduct ? `${apiBaseUrl}/${editingProduct._id}` : apiBaseUrl;
    const method = editingProduct ? 'PUT' : 'POST';
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
        setEditingProduct(null);
        setFormData({ name: '', description: '', price: '', category: '', image: '' });
        fetchProducts();
      } else {
        setError(data.message || 'Failed to save product');
      }
    } catch (err) {
      setError('An error occurred while saving the product');
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        setSuccess('Product deleted successfully!');
        fetchProducts();
      } else {
        setError('Failed to delete product');
      }
    } catch (err) {
      setError('An error occurred while deleting the product');
    }
  };

  // Set product for editing
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
    });
  };

  return (
    <div className="admin-dashboard">
      <h2 style={{fontSize:'43px'}}>Admin Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <h3>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Product Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Product Image URL"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>
      <h3>Products List</h3>
      <div className="admin-list">
        
        {products.map((product) => (
          <div key={product._id} className="admin-card">
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <div className="button-group">
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
