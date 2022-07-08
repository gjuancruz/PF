import {Router, Request, Response}  from 'express'
import { PrismaClient } from '@prisma/client'
import {cars, spider} from "./data"

const prisma = new PrismaClient()

const router = Router()

let date: Date = new Date();
let day = date.getDate();
let month = date.getMonth()
let year = date.getFullYear()

//http://localhost:3001/api/movies/createMovie
router.post("/createMovie", async (req:Request, res:Response) =>{
    try{
        const {Title,Plot,Genre,Actors,Language,Director,Release,Poster,Rated,Type,Trailer,Runtime} = req.body
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
    
    res.json(movie)
    
    }catch(e){
        res.status(404).json("no se pudo crear la movie")
    }
})

//http://localhost:3001/api/movies/billboard
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

//http://localhost:3001/api/movies/34f36be2-fd18-428d-8886-b1a41fa27132
router.get("/search/:id", async (req:Request,res:Response) =>{
    const {id} = req.params
    try{
        const movie = await prisma.movie.findUnique({
            where:{id:id}
        })
        res.json(movie)

    }catch(e){
        res.status(404).json("no se encontró la movie con ese id")
    }
})

//http://localhost:3001/api/movies/search?name=cars
// router.get('/search', async (req: Request, res:Response) =>{
//     const {name} = req.query;
//     try {
//         const seachByName = await prisma.movie.findMany({
//             where: {
//                 Title: {
//                     contains: `${name}`,
//                     mode: 'insensitive'
//                 }
//             }
//         })
//         res.json(seachByName)
//     } catch (e:any) {
//         res.status(404).json(e.message)
//     }
   
// })

// //http://localhost:3001/api/movies/genres?genre=Comedy
// router.get('/genres', async (req: Request, res:Response) =>{
//     const {genre} = req.query;
//     try {
//         const filterByGenre = await prisma.movie.findMany({
//             where: {
//                 Genre: {
//                     contains: `${genre}`,
//                     mode: 'insensitive'
//                 }
//             }
//         })
//         console.log(filterByGenre)
//         res.json(filterByGenre)
//     } catch (e:any) {
//         res.status(404).json(e.message)
//     }
// })


// //http://localhost:3001/api/movies/types?genre=Comedy
// router.get('/types', async (req: Request, res:Response) =>{
//     const {type} = req.query;
//     try {
//         const filterByType = await prisma.movie.findMany({
//             where: {
//                 Type: {
//                     contains: `${type}`,
//                     mode: 'insensitive'
//                 }
//             }
//         })
//         console.log(filterByType)
//         res.json(filterByType)
//     } catch (e:any) {
//         res.status(404).json(e.message)
//     }
// })


// router.get("/billboard", async (req:Request, res:Response) =>{

//     try {
//         const list: [] = await Movie.findAll({
//             // include: Room
//             where: {
//                 Release:{
//                     [Op.and]: {
//                         day:{
//                             [Op.lte]: day
//                         },
//                         month:{
//                             [Op.lte]: month
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














router.get('/search', async (req: Request, res:Response) =>{
    const {name, genre, type} = req.query;
    try {
        if(name){
            const seachByName = await prisma.movie.findMany({
                where: {
                    Title: {
                        contains: `${name}`,
                        mode: 'insensitive'
                    }
                }
            })
            res.json(seachByName)
        }
        else if(genre){
            const filterByGenre = await prisma.movie.findMany({
                where: {
                    Genre: {
                        contains: `${genre}`,
                        mode: 'insensitive'
                    }
                }
            })
            res.json(filterByGenre)
        }
        else if (type){
            const filterByType = await prisma.movie.findMany({
                where: {
                    Type: {
                        contains: `${type}`,
                        mode: 'insensitive'
                    }
                }
            })
            console.log(filterByType)
            res.json(filterByType)
        }
    } catch (e:any) {
        res.status(404).json(e.message)
    }
   
})
export default router