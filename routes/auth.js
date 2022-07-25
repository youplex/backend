/**
 * 
 * @module routes/auth
 * @requires express
 * @requires jsonwebtoken
 * @requires cookieParser
 * 
 */

import { Router } from 'express';

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
router.post('/login', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});


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
router.post('/refresh', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

export default router;
