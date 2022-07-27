import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello from v1 Router');
});

router.use('/auth', authRouter);
router.use('/user', userRouter);


export default router;