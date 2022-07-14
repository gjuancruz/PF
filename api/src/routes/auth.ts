require('dotenv').config();
import {Router, Request, Response, NextFunction}  from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import  verifyToken  from '../middlewares/middlewares';


const prisma = new PrismaClient()
const router = Router();

router.post('/register' , async (req:Request, res:Response) => {
    try {
        const { email, password, role } = req.body;
        //Lets hash the password
        const hashedPassword = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS)
          );
        const user = await prisma.user.findUnique({
            // @ts-ignore 
            where: { username: email }
        })
    
        if ( user ) {
            res.status(400).send({ error: 'User already exists' });
        }
    
        //Adding user to database
        const newUser = await prisma.user.create({
            // @ts-ignore
            data: { username: email,password: hashedPassword, role: role }
        });
        
        return res.status(201).json({ ok: 'Usuario creado !'})

    } catch (error) {
        console.log(error);
        return res.status(404).send ({ error: 'Error al crear el usuario' });
    }
})

// Ruta Login
router.post('/login', async (req:Request, res:Response) => {
    try {
        const { email, password } = req.body;

        if( !email || !password ) {
            return res.status(400).send({ error: 'Por favor ingresa mail y contraseña válidos' })
        };
        //Second we fidn out if that email exists in our database.
        const user = await prisma.user.findUnique({
            // @ts-ignore
            where: { username: email }
        });

        if( !user ) {
            return res.status(400).send({ error: 'El usuario no existe, intente nuevamente' })
        }

        //Comparando Password
        
        const comparePassword = await bcrypt.compare( password, user.password );
        
        if( !comparePassword ) {
            return res.status(403).json ({ error: 'Contraseña o Usuario Incorrecto'})
        }

        //Generando Token
        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
        return res.status(200).json({ token: token});
    } catch (error) {
        console.log(error);
        return res.status(400).send('Error al iniciar sesión');
    }
});

export default router;