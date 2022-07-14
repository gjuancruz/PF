import {Router} from 'express';
import userRoutes from './user';
import moviesRoutes from './movies';
import authRoutes from './auth';
const router = Router();

router.use('/user', userRoutes);
router.use('/movies', moviesRoutes);
router.use('/auth', authRoutes);

export default router;