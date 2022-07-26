import { Router } from 'express';
import authRouter from './auth.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello from v1 Router');
});

router.use('/auth', authRouter);


export default router;