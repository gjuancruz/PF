import {Router, Request, Response}  from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router()

let date: Date = new Date();
let day = date.getDate();
let month = date.getMonth()
let year = date.getFullYear()


router.post("/", async (req:Request, res:Response) =>{
    const {Title,Plot,Genre,Actors,Language,Director,Release,Poster,Rated,Trailer,Runtime} = req.body
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
            Trailer,
            Runtime
        },
      })

    res.json(movie)

})


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

router.get("/:id", async (req:Request,res:Response) =>{
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



export default router