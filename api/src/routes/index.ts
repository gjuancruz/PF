import {Router} from 'express';
import userRoutes from './user';
import moviesRoutes from './movies';
const router = Router();

router.use('/user', userRoutes);
router.use('/movies', moviesRoutes);


export default router;