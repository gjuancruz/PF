import {Router, Request, Response, NextFunction}  from 'express'
import { Prisma, PrismaClient} from '@prisma/client'


const prisma = new PrismaClient()

const router = Router();

router.post("/createRoom", async (req:Request, res:Response) =>{

    const {type} = req.body
    try{
        let newRoom : Prisma.RoomCreateInput 
        // newRoom = {type:type}
        // const room = await prisma.room.create({
            // data:  newRoom
            
        // })

        // res.status(201).json(room)

    }catch(e:any){
        res.json(e.message)
    }
})


export default router