const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Increase quantity of a product in the cart
exports.increaseQuantity = async (req, res) => {
    try {
      const { productId } = req.params;
      const cart = await Cart.findOne({ user: req.user._id });
  
      if (!cart) return res.status(404).json({ message: 'Cart not found' });
  
      const existingItem = cart.items.find(item => item.product.toString() === productId);
  
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  