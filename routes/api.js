import { Router } from 'express';
import v1Router from './v1/v1.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello from api Router');
});

router.use('/v1', v1Router);

export default router;