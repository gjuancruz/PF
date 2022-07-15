import {Router} from 'express';
import moviesRoutes from './movies';
import commentsRoutes from "./comments"
import feedbackRoutes from "./feedback"
import admin from './admin';
import show from './show';

const router = Router();

router.use('/movies', moviesRoutes);
router.use('/comments', commentsRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/admin',admin)
router.use('/show',show)


export default router;