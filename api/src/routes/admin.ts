import {Router, Request, Response, NextFunction}  from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router();

