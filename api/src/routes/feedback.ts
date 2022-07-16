import {Router, Request, Response, NextFunction}  from 'express'
import {PrismaClient} from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()



router.get("/", async (req:Request, res:Response) =>{

    try{

        const feedback = await prisma.feedback.findMany({
            include:{
                user:true
            }
        })
        res.json(feedback)


    }catch(e:any){
        res.json(e.message)
    }
})

router.post("/add/:id", async (req:Request, res:Response) =>{
    
    const {id} = req.params
    const {Text} = req.body

    try{
        const feedback = await prisma.feedback.create({
            data:{
                Text:Text,
                user:{
                    connect:{
                        id:String(id)
                    }
                }
            }
        })

        res.status(201).json("feedback creado exitosamente")

    }catch(e:any){
        res.json(e.message)
    }
})

export default router