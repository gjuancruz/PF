import {Router} from 'express';
import userRoutes from './user';
import moviesRoutes from './movies';
import commentsRoutes from "./comments"
import feedbackRoutes from "./feedback"
import admin from './admin';

const router = Router();

router.use('/user', userRoutes);
router.use('/movies', moviesRoutes);
router.use('/comments', commentsRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/admin',admin)


export default router;