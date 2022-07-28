/**
* 
* @module routes/user
* @requires express
* 
*/

import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.js';
import validate from '../../middlewares/validator.js';
import User from '../../models/user.js';
import { userPutSchema } from '../../models/validationSchema.js';

const router = Router();

router.get('/', requireAuth, async (req, res) => {
    const { email = '' } = req.user || {};
    try {
        // get user details after removing sensitive data
        const user = await User.findOne({ email }).select('_id name email image calendarAccess');
         // check if user exists
        if(!user) return res.status(400).json({message: "No User Found"});
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json(error); 
    }
});


router.put('/', requireAuth, validate(userPutSchema), async (req, res) => {
    const { email = '' } = req.user || {};
    const { name, image } = req.body;
   try {
        const user = await User.findOneAndUpdate(
            { email },
            { $set: { name, image } }, { new: true } )
        .select('_id name email image calendarAccess');
        // check if user exists
        if(!user) return res.status(400).json({message: "No User Found"});   
        res.json(user);
   } catch (error) {
        console.log(error);
        res.status(500).json(error); 
   } 
});

export default router;