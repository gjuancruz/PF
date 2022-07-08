import { PrismaClient } from '@prisma/client';
import {Response, Request, Router, NextFunction} from 'express';
// import {sequelize} from '../db'

const router = Router();

const prisma = new PrismaClient()

// router.get('/', (req: Request, res: Response) => {
//     res.send('soy la ruta get!');
// });

// router.post('/', (req: Request, res: Response) => {
//     res.send('soy la ruta post!');
// });

// router.get('/movie', (req: Request, res: Response, next: NextFunction) => {
//     prisma.movies.findAll()
//      .then((movie:any) => {
//         let movielist : Object[] = movie.map((e:Object)=>{

//         })
//       res.send(movie);
//      })
//      .catch((error:unknown) => res.send(error));
//     //  .catch((error:unknown) => next(error));
// });

// router.get("/movie/:title", async(req:Request,res:Response,next:NextFunction)=>{
//     const title = req.params.title
//     try{
//         const movie = await prisma.movie.findOne({where:{Title:title}})
//         res.send(movie)
//         }catch(err:unknown){
//         res.send(err)
//     }
// })

// router.post('/movie', (req: Request, res: Response, next: NextFunction) => {
//     const movie = req.body;
//     console.log(movie);
    
//     prisma.movie.create(movie)
//      .then((createdMovie:any) => {
//       res.send(createdMovie);
//      })
//      .catch((error:unknown) => next(error));
// });

export default router;