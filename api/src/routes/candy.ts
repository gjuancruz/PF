import {Router, Request, Response, NextFunction}  from 'express'
import {PrismaClient} from '@prisma/client'
import { json } from 'stream/consumers'

const router = Router()
const prisma = new PrismaClient()

// http://localhost:3001/candy
router.get('/', async(req:Request, res:Response) => {
    try {
        const food = await prisma.candy.findMany({})
        res.json(food)
    }catch(e:any){
        res.json(e.message)
    }
} )


router.post('/add',  async (req:Request,res:Response)=>{
    try {
        const {name, picture, price} = req.body
        const food : any = await prisma.candy.create({
            data:{
                name: name,
                picture: picture,
                price: price,
            }, 
            // include:{
            //     ticket: true
            // }
        })
        res.status(201).json(food)

    }catch(e:any){
        console.log(e.message)
        res.status(404).json(e.message)
    }
})



export default router