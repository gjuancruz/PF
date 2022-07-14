import { Strategy } from 'passport-local';
import boom from '@hapi/boom';
import bcrypt from 'bcrypt'

// import express from 'express';
import { prisma } from '../../routes/index'

// const findByEmail = async(email:string) => {
//     const movie = await prisma.user.findUnique({
//         where:{username: email}
//     })
//     return movie;
// }

const LocalStrategy = new Strategy({
        usernameField: 'email'
    },async(username, password, done) => {
    try {
        const user = await prisma.user.findUnique({
            where:{username: username}
        })
        if(!user) throw done(boom.unauthorized(), false);
        //verifica si la contraseña de la base de datos que esta encriptada y la contraseña 
        //recibida desde lo que manda el usuario es la misma si coinciden deja acceder ala ruta
        const isMatch = await bcrypt.compare(password, user!.password);
        if(!isMatch) throw done(boom.unauthorized().output.payload, false)
        //si todo salio bien entonces manda la informacion y deja acceder a la ruta
        // if user.role === admi
        done(null, user);
    } catch (error) {
        done(error, false)
    }
});

export default LocalStrategy;