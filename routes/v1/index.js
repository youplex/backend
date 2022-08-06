import { Router } from 'express';
import authRoutes from './auth.js';
import userRoutes from './user.js';
import playlistRoutes from './playlist.js';
import videoRoutes from './video.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello from v1 Router');
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/playlist', playlistRoutes);
router.use('/video', videoRoutes);


export default router;