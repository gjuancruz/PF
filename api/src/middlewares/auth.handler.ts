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