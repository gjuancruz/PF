import {Router, Request, Response, NextFunction}  from 'express'
import { PrismaClient } from '@prisma/client'
import { cars } from './data';

const prisma = new PrismaClient()

const router = Router()

let date: Date = new Date();
let day = date.getDate();
let month = date.getMonth()
let year = date.getFullYear()

//http://localhost:3001/movies/createMovie
router.post("/createMovie", async (req:Request, res:Response) =>{
    try{

        const {Title, Plot, Genre, Actors, Language, Director, Release,
                Poster, Rated, Type, Trailer, Runtime} = req.body
        const movie = await prisma.movie.create({
            data: {
                Title,
                Plot,
                Genre,
                Actors,
                Language,
                Director,
                Release,
                Poster,
                Rated,
                Type,
                Trailer,
                Runtime
        },
    })
    
    res.status(201).json(movie)
    
    }catch(e){
        res.status(404).json("no se pudo crear la movie")
    }

})

//http://localhost:3001/movies/billboard
router.get("/billboard", async (req:Request, res:Response) =>{
    
    try{
        const list = await prisma.movie.findMany({
            // where:{
                //     Release:{}
            // }
        })
        res.json(list)
        // res.json(date)

    }catch (error) {
        res.status(404).json("No se obtuvieron datos")
    }
})

//http://localhost:3001/movies/:id
router.get("/search/:id", async (req:Request,res:Response) =>{
    const {id} = req.params
    try{
        const movie = await prisma.movie.findUnique({
            where:{id:id}
        })
        res.json(movie)

    }catch(e){
        res.status(404).json("no se encontró la movie")
    }
})

//http://localhost:3001/movies/:id
router.post("/search/:id", async (req:Request,res:Response) =>{
    const {id} = req.params
    const body = req.body
    try{
        const movie : any = await prisma.movie.findUnique({
            where:{id:id},select:{
                id:false,
                Title: true,
                Plot: true,
                Genre:true,
                Actors: true,
                Language: true,
                Director: true,
                Release: true,
                Poster: true,
                Rated: true,
                Trailer: true,
                Type: true,
                Runtime: true
            }
        })
        const comment = await prisma.comment.create({
            data:{
                Text:body.Text,
                movie:{create:movie}
            }
        })
        res.json(comment)
    }catch(e:any){
        res.status(404).json(e.message)
    }
})

//http://localhost:3001/movies?name=cars
router.get('/search', async (req: Request, res:Response) =>{
    const {name} = req.query;
    try {
        const seachByName = await prisma.movie.findMany({
            where: {
                Title: {
                    contains: `${name}`,
                    mode: 'insensitive'
                }
            }
        })
        res.json(seachByName)
    } catch (error) {
        res.status(404).json("no se encontro peli con ese nombre")
    }
   
})

//http://localhost:3001/movies?genre=Comedy
router.get('/genres', async (req: Request, res:Response) =>{
    const {genre} = req.query;
    try {
        const filterByGenre = await prisma.movie.findMany({
            where: {
                Genre: {
                    contains: `${genre}`,
                    mode: 'insensitive'
                }
            }
        })
        res.json(filterByGenre)
    } catch (e:any) {
        res.status(404).json(e.message)
    }
})



// router.post("/moviesDefault", async (req:Request, res:Response) =>{
//     try{

//         // const {Title,Plot,Genre,Actors,Language,Director,Release,Poster,Rated,Type,Trailer,Runtime} = req.body
//         const movie = await prisma.movie.createMany({
//             data: [cars, spider]
//         })
    
//         res.json(movie)
    
//     }catch(e:any){
//         res.status(404).json(e.message)
//     }

// })


// router.get("/next_releases", async (req:Request, res:Response) =>{

//     try {
//         const list: [] = await Movie.findAll({
//             // include: Room
//             where: {
//                 Release:{
//                     [Op.and]: {
//                         day:{
//                             [Op.gte]: day
//                         },
//                         month:{
//                             [Op.gte]: month
//                         }
//                       }
//                 }
//             }
//         })
//         res.json(list)
//     } catch (error) {
//         res.status(404).json("No se obtuvieron datos")
//     }
// })



export default router