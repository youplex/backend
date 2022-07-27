/**
* 
* @module routes/user
* @requires express
* 
*/

import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.js';
import User from '../../models/user.js';

const router = Router();

router.get('/', /* requireAuth, */async (req, res) => {
    const { email = 'taychaudhary1158@gmail.com' } = req.user || {};
    try {
        // get user details after removing sensitive data
        const user = await User.findOne({ email }).select('-refreshTokens -googleToken');
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); 
    }
});


router.put('/', /* requireAuth, */ async (req, res) => {
    const { email = 'taychaudhary1158@gmail.com' } = req.user || {};
    const { name, image } = req.body;
   try {
        const user = await User.findOneAndUpdate(
            { email },
            { $set: { name, image } }, { new: true } )
            .select('-refreshTokens -googleToken');
            
        res.json(user);
   } catch (error) {
        console.log(error);
        res.status(500).json(error); 
   } 
});

export default router;