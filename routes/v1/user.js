/**
* 
* @module routes/user
* @requires express
* 
*/

import { Router } from 'express';
import { getUserDetails, updateUserDetails } from '../../controllers/userControllers.js';
import { requireAuth } from '../../middlewares/auth.js';
import validate from '../../middlewares/validator.js';
import { userPutSchema } from '../../models/validationSchema.js';

const router = Router();

/**
* @swagger
* 
* /user/:
*   get:
*     summary: get user data 
*     tags: [User]
*     requestHeaders:
*       required: true
*     responses:
*       200:
*         description: data of user
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                     _id:
*                       type: string
*                     email:
*                       type: string
*                     name:
*                       type: string
*                     image:
*                       type: string
*                     calendarAccess:
*                       type: boolean
*       401:
*         description: Invalid Token
*       500:
*         description: Internal Server Error                
*      
*/
router.get('/', requireAuth, getUserDetails);

/**
* @swagger
* 
* /user/:
*   put:
*     summary: update user data 
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               image:
*                 type: string
*     requestHeaders:
*       required: true
*     responses:
*       200:
*         description: data of user
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                     _id:
*                       type: string
*                     email:
*                       type: string
*                     name:
*                       type: string
*                     image:
*                       type: string
*                     calendarAccess:
*                       type: boolean
*       401:
*         description: Invalid Token
*       500:
*         description: Internal Server Error                
*      
*/
router.put('/', requireAuth, validate(userPutSchema), updateUserDetails);

export default router;