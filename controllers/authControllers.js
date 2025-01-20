const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
  
      // Check if trying to create an admin account
      if (role === 'admin') {
        // Allow first admin registration without token
        const existingAdmin = await User.findOne({ role: 'admin' });
        if (!existingAdmin) {
          console.log('First admin account is being created.');
        }
      }
  
      // Create the user
      const user = new User({ name, email, password, role: role || 'user' });
      await user.save();
  
      // Generate a token for the new user
      const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret');
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

