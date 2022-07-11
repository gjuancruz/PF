import {Router, Request, Response, NextFunction}  from 'express'
import { PrismaClient } from '@prisma/client'

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
        })
        res.json(list)
    
    }catch (error) {
        res.status(404).json("No se obtuvieron datos")
    }
})

//http://localhost:3001/movies/search/:id
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
        const comment : any = await prisma.comment.create({
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

//http://localhost:3001/movies/search?name=cars
//http://localhost:3001/movies/search?genre=comedy
//http://localhost:3001/movies/search?type=3d
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
            if(genre === 'All') return res.json(await prisma.movie.findMany({}))
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
        else if(type){
            const filterByType = await prisma.movie.findMany({
                where: {
                    Type: {
                        contains: `${type}`,
                        mode: 'insensitive'
                    }
                }
            })
            res.json(filterByType)
        }
        
    } catch (error) {
        res.status(404).json("no se encontro peli con ese nombre")
    }
   
})



export default router
