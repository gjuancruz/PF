import {Router, Request, Response, NextFunction}  from 'express'
import { PrismaClient, Prisma} from '@prisma/client'


const prisma = new PrismaClient()

const router = Router();

//http://localhost:3001/room/createRoom
router.post("/createRoom", async (req:Request, res:Response) =>{
    try{
        const {name, roomType, disponiblity} = req.body
        let room: Prisma.UserCreateInput
        room={
            name,
            roomType,
            disponibility: disponiblity || true,
        }
        
        const createRoom = await prisma.room.create({
            data: room
    })
    
    res.status(201).json(createRoom)
    
    }catch(e:any){
        res.status(404).json(e.message)
    }
})

export default router;