import { PrismaClient } from '@prisma/client'
import {Router} from 'express';
import passport from "passport";

import LocalStrategy from "../authentication/strategies/local.strategy";
import userRoutes from './user';
import moviesRoutes from './movies';

export const prisma = new PrismaClient()

passport.use(LocalStrategy);
const router = Router();

router.use('/user', userRoutes);
router.use('/movies', moviesRoutes);

export default router;