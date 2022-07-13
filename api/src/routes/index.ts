import {Router} from 'express';
import userRoutes from './user';
import moviesRoutes from './movies';
import commentsRoutes from "./comments"
import feedbackRoutes from "./feedback"

const router = Router();

router.use('/user', userRoutes);
router.use('/movies', moviesRoutes);
router.use('/comments', commentsRoutes);
router.use('/feedback', feedbackRoutes);


export default router;