require('dotenv').config();
import {Router, Request, Response, NextFunction}  from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import  verifyToken  from '../middlewares/middlewares';


const prisma = new PrismaClient()
const router = Router();

router.post('/register', async (req:Request, res:Response) => {
    try {
        const { email, password, role, username } = req.body;
        //Lets hash the password
        const hashedPassword = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS)
          );
        const user = await prisma.user.findUnique({
            // @ts-ignore 
            where: { email: email }
        })
    
        if ( user ) {
            return res.status(400).send({ error: 'User already exists' });
        }
    
        //Adding user to database
        const newUser = await prisma.user.create({
            // @ts-ignore
            data: { username: username , email: email ,password: hashedPassword, role: role }
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
            where: { email: email }
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
        const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET || '');

        // Obtener id para almacenar en localStorage

        const userStorage = await prisma.user.findUnique({
            // @ts-ignore
            where: { email: email }
        });

        return res.status(200).json({ token: token, user: userStorage});
    } catch (error) {
        console.log(error);
        return res.status(400).send('Error al iniciar sesión');
    }
});

router.get('/acceder', [verifyToken], async (req:Request, res:Response) => {
    try {
        res.send({
            permitir: true
        })
    } catch (error) {
        res.status(403).send({
            permitir: false
        })
    }
});

router.get('/verify',[verifyToken], async (req:Request, res:Response) => {
    try {
        res.json({
            check: true
        })
    } catch (error) {
        res.json({
            check: false
        })
    }
    }
)

export default router;