import { sequelize } from '../config/database.js';
import { Order, OrderItem } from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

export const createOrder = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const UserId = req.user.id;
    
    const cartItems = await Cart.findAll({
      where: { UserId },
      include: [Product]
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + (item.priceAtAdd * item.quantity);
    }, 0);

    const order = await Order.create({
      UserId,
      totalAmount,
      status: 'pending'
    }, { transaction: t });

    for (const item of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        ProductId: item.ProductId,
        quantity: item.quantity,
        price: item.priceAtAdd
      }, { transaction: t });

      const product = await Product.findByPk(item.ProductId, { transaction: t });
      product.stock -= item.quantity;
      await product.save({ transaction: t });
    }

    await Cart.destroy({
      where: { UserId },
      transaction: t
    });

    await t.commit();
    res.status(201).json(order);
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const UserId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    const where = isAdmin ? {} : { UserId };

    const orders = await Order.findAll({
      where,
      include: [{
        model: OrderItem,
        include: [Product]
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};