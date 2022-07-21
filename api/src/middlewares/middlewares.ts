require('dotenv').config();
import {Router, Request, Response, NextFunction}  from 'express';
import jwt from 'jsonwebtoken';


const verifyToken = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const headerToken:any = req.headers.authorization;
        if ( !headerToken ) {
            return res.status(401).send({ error: 'No token provided' });
        }
        const token = headerToken.split(' ')[1];
        // console.log(token);
        // console.log(req)

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
            // @ts ignore
            // req.user_id = decoded.user_id;
            // console.log(decoded)
            // return true;
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).send({ error: 'Invalid token' });
        }
         
    } catch (error) {
        console.log(error);
        return res.status(401).send({ error: 'Invalid token' });
    }
}

export default verifyToken;
