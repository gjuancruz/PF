import boom from '@hapi/boom'
import {Router, Request, Response, NextFunction}  from 'express'

import config from '../../lib/config'

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
    const apiKey =  req.headers['api'];
    if(apiKey === config.apiKey){
        next();
    } else {
        next(boom.unauthorized());
    }
}

export function checkAdminRole(req:Request, res:Response, next:NextFunction) {
    console.log(req.user);
    const user:any = req.user;
    if(user.role === 'admin') {
        next();
    } else {
        return res.status(401).send(boom.unauthorized().output.payload);
    }
}