import {Router, Request, Response, NextFunction}  from 'express'
import { Prisma, PrismaClient} from '@prisma/client'
import { showGenerator } from '../..';


const prisma = new PrismaClient()

const router = Router();

router.post("/createRoom", async (req:Request, res:Response) =>{

    const {types} = req.body
    try{
        
        const room = await prisma.room.create({
            data:  types
        })

        res.status(201).json(room)

    }catch(e:any){
        res.json(e.message)
    }
})

router.get("/all",async(req:Request,res:Response)=>{
    try{
        const shows = await prisma.show.findMany({where:{id!:undefined},include:{movie:{select:{Title:true}}}})
        // console.log(shows)
        res.send(shows)
    }catch(error){
        res.send(error)
    }
})

router.get("/one/:id",async(req:Request,res:Response)=>{
    const movieId = req.params.id
    try{
        const shows = await prisma.show.findMany({where:{movieId:movieId}})
        console.log(shows)
        return res.send(shows)
    }catch(error:any){
        res.send(error.message)
    }
})

router.delete("/one/:id",async(req:Request,res:Response)=>{
    const id = req.params.id
    try{
        const ticket = await prisma.ticket.deleteMany({where:{showId:id}})
        const shows = await prisma.show.delete({where:{id:id}})
        return res.send(shows)
    }catch(error:any){
        res.send(error.message)
    }
})

router.post("/",async(req:Request,res:Response)=>{
    const show = req.body
    try{
        const data = await showGenerator(show)
        const shows = await prisma.show.createMany({
            data
        }) 
        res.status(200).send("Lista de shows generada")
    }catch(error:any){
        res.send(error.message)
    }
})

export default router