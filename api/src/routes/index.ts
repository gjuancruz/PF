import {Router} from 'express';
import userRoutes from './user';
import moviesRoutes from './movies';
import admin from './admin';

const router = Router();

router.use('/user', userRoutes);
router.use('/movies', moviesRoutes);
router.use('/admin',admin)


export default router;