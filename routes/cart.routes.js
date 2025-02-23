import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { addToCart, getCart, removeFromCart } from '../controllers/cart.controller.js';

const router = express.Router();


/**
 * @swagger
 * /api/cart/addToCart:
 *   post:
 *     summary: Adds a product to the user's cart
 *     security:
 *       - bearerAuth: []
 *     tags: [Cart]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProductId:
 *                 type: string
 *                 description: ID of the product to add to cart
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product to add to cart
 *     responses:
 *       200:
 *         description: Product added to cart
 *       400:
 *         description: Bad request
 */
router.post('/addToCart', authenticate, addToCart);

/**
 * @swagger
 * /api/cart/getCart:
 *   get:
 *     summary: Gets the current cart for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: The current user's cart
 *       401:
 *         description: Unauthorized
 */
router.get('/getCart', authenticate, getCart);

/**
 * @swagger
 * /api/cart/{ProductId}:
 *   delete:
 *     summary: Removes a product from the cart by its ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Cart]
 *     parameters:
 *       - name: ProductId
 *         in: path
 *         required: true
 *         description: The ID of the product to remove
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from cart
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found in cart
 */
router.delete('/:ProductId', authenticate, removeFromCart);

export default router;