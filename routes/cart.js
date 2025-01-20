const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControllers');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, cartController.getCart);
router.post('/add', authMiddleware, cartController.addToCart);
router.delete('/remove/:productId', authMiddleware, cartController.removeFromCart);
router.patch('/increase/:productId', authMiddleware, cartController.increaseQuantity);

module.exports = router;

