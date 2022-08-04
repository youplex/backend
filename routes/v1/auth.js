/**
 * 
 * @module routes/auth
 * @requires express
 * @requires jsonwebtoken
 * 
 */

import { Router } from 'express';
import { loginUser, logoutUser, refreshUserToken } from '../../controllers/authControllers.js';
import validate from '../../middlewares/validator.js';
import { loginSchema } from '../../models/validationSchema.js';
import { requireAuth } from '../../middlewares/auth.js';

/**
 * @constant {string} - url of calendar scope
 */

const router = Router();

/**
 * @swagger
 * 
 * /login:
 *   post:
 *     summary: Log In the user using google OAuth
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Code generated from google
 *     responses:
 *       201:
 *         description: New User created and logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     new: 
 *                       type: boolean 
 *                     token:
 *                       type: string
 *                       description: access token
 *                     email:
 *                       type: string
 *                       description: user's email id
 *       200:
 *         description: User logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     token:
 *                       type: string
 *                       description: access token
 *                     email:
 *                       type: string
 *                       description: user's email id
 *       500:
 *         description: Internal Server Error
 * 
 *
 */

/**
 * Route for signing up and logging in users
 * @name post/login
 * @function
 * @memberof module:routes/auth
 * @param {string} path - Express path 
 * @param {Object} middleware - Express Middleware
 */
router.post('/login', validate(loginSchema), loginUser);


/**
 * @swagger
 * 
 * /refresh:
 *   post:
 *     summary: Refresh User's Access Token
 *     tags: [Auth]
 *     requestHeaders:
 *       required: true
 *     responses:
 *       200:
 *         description: New Token Issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     token:
 *                       type: string
 *                       description: new access token
 *       401:
 *         description: Invalid Token
 *       500:
 *         description: Internal Server Error
 * 
 *
 */
router.post('/refresh', refreshUserToken);

/**
 * @swagger
 * 
 * /logout:
 *   post:
 *     summary: Refresh User's Access Token
 *     tags: [Auth]
 *     requestHeaders:
 *       required: true
 *     responses:
 *       200:
 *         description: New Token Issued
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                     success:
 *                       type: boolean
 *       401:
 *         description: Invalid Token
 *       500:
 *         description: Internal Server Error
 * 
 *
 */
router.post('/logout', requireAuth, logoutUser);

export default router;
