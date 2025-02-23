import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

export const addToCart = async (req, res) => {
  try {
    const { ProductId, quantity } = req.body;
    const UserId = req.user.id;

    const product = await Product.findByPk(ProductId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const cartItem = await Cart.findOne({
      where: { UserId, ProductId }
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await Cart.create({
        UserId,
        ProductId,
        quantity,
        priceAtAdd: product.price
      });
    }

    res.status(201).json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const UserId = req.user.id;
    
    const cartItems = await Cart.findAll({
      where: { UserId },
      include: [Product]
    });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { ProductId } = req.params;
    const UserId = req.user.id;

    const cartItem = await Cart.findOne({
      where: { UserId, ProductId }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    await cartItem.destroy();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error: error.message });
  }
};