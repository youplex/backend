/**
 * 
 * @module routes/auth
 * @requires express
 * @requires jsonwebtoken
 * @requires cookieParser
 * 
 */

import { Router } from 'express';
import { COOKIE_OPTIONS, getAccessToken, getRefreshToken } from '../../middlewares/auth.js';
import User from '../../models/user.js';
import getOAuthClient from '../../utils/google.js';

/**
 * @constant {string} - url of calendar scope
 */
const CALENDAR_SCOPE = 'https://www.googleapis.com/auth/calendar';

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
router.post('/login', async (req, res) => {
    const { code = '' } = req.body;
    try {
        const OAuthClient = getOAuthClient();
        const response = await OAuthClient.getToken(code);

        const { tokens : { refresh_token: googleToken, id_token } = {} } = response;
        const scope = response.res.data.scope;
        
        const isCalendarGranted = (scope.split(' ').findIndex(CALENDAR_SCOPE) !== -1);
        console.log({ isCalendarGranted });
        // get user info from id_token
        const userInfo = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());

        const user = await User.findOne({ email: userInfo.email });
        const [ jwtToken, refreshToken ] = [
                getAccessToken({ email : userInfo.email}),
                getRefreshToken({ email : userInfo.email})
            ];

        res.cookie('playlist_refresh', refreshToken, COOKIE_OPTIONS);
        if(user){
            // add new refresh token for different devices
            user.refreshTokens = [...user.refreshTokens, { refreshToken }];
            
            // update if calendar access has changed
            if(user.calendarAccess !== isCalendarGranted){
                user.calendarAccess = isCalendarGranted
            }

            await user.save()
            return res.json({ status: 'ok',  token: jwtToken, email: user.email });
        }

        const newUser = await User.create({
            name: userInfo.name,
            email: userInfo.email,
            image: userInfo.picture,
            refreshToken: [{ refreshToken }],
            googleToken: googleToken,
            calendarAccess: isCalendarGranted
        });

        res.status(201).send({ new: true, token: jwtToken, email: newUser.email });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);  
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
