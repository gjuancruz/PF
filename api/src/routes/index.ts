import {Router} from 'express';
import moviesRoutes from './movies';
import authRoutes from './auth';
import commentsRoutes from "./comments"
import feedbackRoutes from "./feedback"
import admin from './admin';
import show from './show';
<<<<<<< HEAD
import room from './room';
=======
import candyRoutes from './candy'
>>>>>>> ec9fe3931df06a96fcab702220d33d3ddf50615c

const router = Router();

router.use('/movies', moviesRoutes);
router.use('/auth', authRoutes);
router.use('/comments', commentsRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/admin',admin)
router.use('/show',show)
<<<<<<< HEAD
router.use('/room',room)
=======
router.use('/candy', candyRoutes)
>>>>>>> ec9fe3931df06a96fcab702220d33d3ddf50615c


export default router;