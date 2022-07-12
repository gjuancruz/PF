import {Router} from 'express';
import userRoutes from './user';
import moviesRoutes from './movies';
import mercadopago from './mercadopago';
const router = Router();

router.use('/user', userRoutes);
router.use('/movies', moviesRoutes);
router.use('/mercadopago', mercadopago);

export default router;