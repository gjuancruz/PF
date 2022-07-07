import {Response, Request, Router, NextFunction} from 'express';
import { ArrayTypeNode } from 'typescript';
import {Movie} from '../models/Movie';
// import {sequelize} from '../db'

const router = Router();

// router.get('/', (req: Request, res: Response) => {
//     res.send('soy la ruta get!');
// });

// router.post('/', (req: Request, res: Response) => {
//     res.send('soy la ruta post!');
// });

router.get('/movie', (req: Request, res: Response, next: NextFunction) => {
    Movie.findAll()
     .then((movie:any) => {
        let movielist : Object[] = movie.map((e:Object)=>{

        })
      res.send(movie);
     })
     .catch((error:unknown) => res.send(error));
    //  .catch((error:unknown) => next(error));
});

router.get("/movie/:title", async(req:Request,res:Response,next:NextFunction)=>{
    const title = req.params.title
    try{
        const movie = await Movie.findOne({where:{Title:title}})
        res.send(movie)
        }catch(err:unknown){
        res.send(err)
    }
})

router.post('/movie', (req: Request, res: Response, next: NextFunction) => {
    const movie = req.body;
    console.log(movie);
    
    Movie.create(movie)
     .then((createdMovie) => {
      res.send(createdMovie);
     })
     .catch((error) => next(error));
});

export default router;