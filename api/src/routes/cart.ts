import {Router, Request, Response, NextFunction}  from 'express'
import {PrismaClient} from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

//http://localhost:3001/cart
router.post("/", async (req:Request, res:Response) =>{
    const {idUser} = req.body
    try{
        const card = await prisma.user.findUnique({
            where: {id: idUser},
            include: {
                // cart: true
                cart: {
                    include: {
                        candy: true
                    }
                }

            }
        })
        // @ts-ignore
        res.json(card.cart.candy);
    
    }catch (error:any) {
        res.status(404).json("No hay usuarios que mostrar")
    }
})

export default router;