import { PrismaClient } from "@prisma/client";
import { Router,Request,Response } from "express";


const router = Router()
const prisma = new PrismaClient()

//http://localhost:3001/sale/all
router.get('/all',async(req:Request,res:Response)=>{
    try{
        const sale = await prisma.sale.findMany({include:{candy:true}})
        res.status(200).send(sale)
    }catch(error:any){
        res.send(error.message)
    }
})

export default router