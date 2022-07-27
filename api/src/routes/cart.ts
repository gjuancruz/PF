import {Router, Request, Response, NextFunction}  from 'express'
import {PrismaClient} from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()


// router.get
router.get('/deleteCart', async (req:Request, res:Response) => {
    const carrito = await prisma.cart.deleteMany({});
    return res.send(carrito);
})

//http://localhost:3001/cart --> Obtiene el historial de candys y boletos(tickets) y los manda al front,tiene que recibir el 
//userid desde el front
router.post("/", async (req:Request, res:Response) =>{
    const {idUser} = req.body
    try{
        const user = await prisma.user.findUnique({
            where: {id: idUser},
            include: {
                cart:  {
                    include : {
                        tickets: true,
                        candy: true
                    }
                }
            }
        })
        // @ts-ignore
        res.json(user.cart.candy);
    
    }catch (error:any) {
        res.status(404).json("No hay usuarios que mostrar")
    }
})

router.get("/all",async(req:Request,res:Response)=>{
    try{
        const cart = await prisma.cart.findMany({include:{candy:true}})
        res.status(200).send(cart)
    }catch(error:any){
        res.send(error.message)
    }
})

export default router;