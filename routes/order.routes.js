import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { createOrder, getOrders } from '../controllers/order.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/orders/createOrder:
 *   post:
 *     summary: Creates a new order for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: string
 *                 description: The ID of the cart to create an order from
 *               shippingAddress:
 *                 type: string
 *                 description: The shipping address for the order
 *               paymentMethod:
 *                 type: string
 *                 description: The payment method used for the order
 *     responses:
 *       201:
 *         description: Order successfully created
 *       400:
 *         description: Bad request, invalid input data
 *       401:
 *         description: Unauthorized, user not authenticated
 */
router.post('/createOrder', authenticate, createOrder);

/**
 * @swagger
 * /api/orders/getOrders:
 *   get:
 *     summary: Retrieves all orders for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: string
 *                     description: The unique ID of the order
 *                   status:
 *                     type: string
 *                     description: The current status of the order (e.g., pending, shipped, delivered)
 *                   totalAmount:
 *                     type: number
 *                     description: Total amount of the order
 *                   createdAt:
 *                     type: string
 *                     description: Date the order was created
 *       401:
 *         description: Unauthorized, user not authenticated
 */
router.get('/getOrders', authenticate, getOrders);

export default router;
