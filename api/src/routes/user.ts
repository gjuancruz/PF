import {Response, Request, Router, NextFunction} from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from './index'
import { checkApiKey } from '../middlewares/auth.handler'
import config from '../../lib/config'
// import {Movie} from '../models/Movie';
// import {sequelize} from '../db'

const router = Router();

router.get('/', checkApiKey, (req: Request, res: Response) => {
    try {
        res.send('soy la ruta get!');
    } catch (error) {
        res.send(error)
    }
});

interface user {
    username: string
    password: string
    role: string
}

router.post('/register', async(req: Request, res: Response) => {
    try {
        const {username, password, role}:user = req.body;
        const user = await prisma.user.findUnique({
            where: {username: username}
        })
        if(user) return res.status(403).json({error: 'Username already exist...'})
        
        const hashPassword = await bcrypt.hash(password, 10);
        const userRegister = await prisma.user.create({
            // @ts-ignoreee
            data: {
                username, 
                password: hashPassword, 
                role
            }
        })
        // delete userRegister.password
        res.send(userRegister);
    } catch (error) {
        res.send(error)
    }

});

interface user {
    id?: string;
    role: string;
}

router.post("/login", 
    passport.authenticate('local', {session: false}),
    async (req:Request, res:Response, next:NextFunction) =>{
    try{
        // if(req.user) return res.status(401).send('')
        const { id, role }:any = req.user;
        const payload = {
            id,
            role
        }
        const token = jwt.sign(payload, config.jwtSecret || '');
        res.json({
            id,
            role,
            token
        })
    }catch(e:any){
        res.status(401).json(e);
    }
})

// router.get('/', (_req, res: Response, next: NextFunction) => {
//     Movie.findAll()
//      .then((movie:any) => {
//       res.send(movie);
//      })
//      .catch((error:unknown) => res.send(error));
//     //  .catch((error:unknown) => next(error));
// });

// router.post('/', (req: Request, res: Response, next: NextFunction) => {
//     const user = req.body;
//     console.log(user);
    
//     Movie.create(user)
//      .then((createdUser) => {
//       res.send(createdUser);
//      })
//      .catch((error) => next(error));
// });

export default router;