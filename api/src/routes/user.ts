import {Response, Request, Router, NextFunction} from 'express';
import {Movie} from '../models/Movie';
// import {sequelize} from '../db'

const router = Router();

// router.get('/', (req: Request, res: Response) => {
//     res.send('soy la ruta get!');
// });

// router.post('/', (req: Request, res: Response) => {
//     res.send('soy la ruta post!');
// });

router.get('/', (_req, res: Response, next: NextFunction) => {
    Movie.findAll()
     .then((movie:any) => {
      res.send(movie);
     })
     .catch((error:unknown) => res.send(error));
    //  .catch((error:unknown) => next(error));
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;
    console.log(user);
    
    Movie.create(user)
     .then((createdUser) => {
      res.send(createdUser);
     })
     .catch((error) => next(error));
});

export default router;