import {Router, Request, Response, NextFunction}  from 'express'
import {PrismaClient} from '@prisma/client'
import { json } from 'stream/consumers'

const router = Router()
const prisma = new PrismaClient()



// http://localhost:3001/candy
router.get('/', async(req:Request, res:Response) => {
    try {
        const food = await prisma.menu.findMany({})
        return res.json(food)
    }catch(e:any){
        res.json(e.message)
    }
} )

// http://localhost:3001/candy/add
router.post('/add',  async (req:Request,res:Response)=>{
    try {
        const {index, quantity,cartId} = req.body
        const product : any= await prisma.menu.findUnique({
            where:{id:index}
        })
        console.log('this is product :',product)
        const totalPrice = product.price*quantity
        const newCandy = await prisma.candy.create({
            data:{
                name:product.name,
                quantity,
                totalPrice
            }
        })
        console.log('this is newCandy :',newCandy)
        const cart = await prisma.cart.findUnique({
            where:{id:cartId}
        })
        console.log('this is cart :',cart)
        const addNewCandy = await prisma.cart.update({
            where:{id:cartId},
            data:{
                // @ts-ignore
                orderPrice: cart.orderPrice + newCandy.totalPrice,
                // @ts-ignore
                userId: cart.userId,
                candy:{
                    connect:{
                        id:newCandy.id
                    }
                }
            }
        })
        console.log('this is addNewCandy :',addNewCandy)
        const newCart = await prisma.cart.findUnique({
            where:{id:cartId}
        })
        return res.json(newCart)

    }catch(e:any){
        console.log(e.message)
        res.status(404).json(e.message)
    }
})



export default router