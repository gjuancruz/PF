import {Router} from 'express';
import moviesRoutes from './movies';
import authRoutes from './auth';
import commentsRoutes from "./comments"
import feedbackRoutes from "./feedback"
import admin from './admin';
import show from './show';
import candyRoutes from './candy'
import ticketsRoutes from './tickets';
import cart from './cart';

const router = Router();

router.use('/movies', moviesRoutes);
router.use('/auth', authRoutes);
router.use('/comments', commentsRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/admin',admin)
router.use('/show',show)
router.use('/candy', candyRoutes)
router.use('/tickets', ticketsRoutes)
router.use('/cart', cart )


export default router;