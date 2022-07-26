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
        const {index, quantity, cartId, userId} = req.body
        
        let newCandy;
        //buscar el card id del usuario
        const user = await prisma.user.findUnique({
            where: {id: userId},
            include: {
                cart:  {
                    include : {
                        tickets: true,
                        candy: true
                    }
                }
            }
        })
        console.log("info user", user);

        
        const product : any= await prisma.menu.findUnique({
            where:{id:index}
        })

        const userCandy = user?.cart?.candy.find(item => item.name === product.name);

        console.log('this is product :',product)
        const totalPrice = product.price*quantity

        if(userCandy){
            newCandy = await prisma.candy.update({
                where:{
                    //@ts-ignore
                    id: userCandy.id
                    // cartId:user?.cart?.id
                    // name:product.name
                },
                data:{
                    name:product.name,
                    quantity: userCandy.quantity + quantity,
                    totalPrice: userCandy.totalPrice + totalPrice,
                    cartId: user?.cart?.id
                }
            })
            console.log("Update Candy respuesta ", newCandy);        
        } else {
            newCandy = await prisma.candy.create({
                data:{
                    name:product.name,
                    quantity,
                    totalPrice,
                    cartId: user?.cart?.id
                    // cartId
                }
            })
            console.log('this is newCandy :',newCandy)
        }

        const cart = await prisma.cart.findUnique({
            where:{id:user?.cart?.id}
        })
        console.log('this is cart :',cart)
        const addNewCandy = await prisma.cart.update({
            where:{id:user?.cart?.id},
            data:{
                // @ts-ignore
                orderPrice: cart.orderPrice + newCandy.totalPrice,
                // @ts-ignore
                userId: cart.userId,
                candy:{
                    connect:{
                        id:newCandy?.id
                    }
                }
            }
        })
        console.log('this is addNewCandy :',addNewCandy)
        const newCart = await prisma.cart.findUnique({
            where:{id:user?.cart?.id}
        })
        return res.json(newCart)

    }catch(e:any){
        console.log(e.message)
        res.status(404).json(e.message)
    }
})


//http://localhost:3001/candy/searchCandy?name=coca
router.get("/searchCandy", async (req: Request, res:Response) =>{
    try {
        const {name} = req.query;
        
            const searchProduct = await prisma.menu.findMany({
                where: {
                    name: {
                        contains: `${name}`,
                        mode: 'insensitive'
                    }
                }
             })
            res.json(searchProduct)
        
    } catch (e:any) {
        res.status(404).json(e.message)
    }
})

// http://localhost:3001/candy/delete
router.delete('/delete',  async (req:Request,res:Response)=>{
    try {
        const {index, quantity, cartId, userId} = req.body
        
        let newCandy;
        //buscar el card id del usuario
        const user = await prisma.user.findUnique({
            where: {id: userId},
            include: {
                cart:  {
                    include : {
                        tickets: true,
                        candy: true
                    }
                }
            }
        })
        console.log("info user", user);

        
        const product : any= await prisma.menu.findUnique({
            where:{id:index}
        })

        const userCandy = user?.cart?.candy.find(item => item.name === product.name);
        
        const userQuantity = userCandy?.quantity
        console.log('this is userQuantity :',userQuantity)

        console.log('this is product :',product)
        
        // @ts-ignore
        const totalPrice = product.price*userQuantity

        if(userCandy){
            newCandy = await prisma.candy.deleteMany({
                where:{
                    //@ts-ignore
                    id: userCandy.id
                    // cartId:user?.cart?.id
                    // name:product.name
                },
            })        
        }

        const cart = await prisma.cart.findUnique({
            where:{id:user?.cart?.id}
        })
        console.log('this is cart :',cart)
        
        await prisma.cart.update({
            where:{id:user?.cart?.id},
            data:{
                // @ts-ignore
                orderPrice: cart.orderPrice - totalPrice,
                // @ts-ignore
                userId: cart.userId,
            }
        })
        
        const newCart = await prisma.cart.findUnique({
            where:{id:user?.cart?.id}
        })
        return res.json(newCart)

    }catch(e:any){
        console.log(e.message)
        res.status(404).json(e.message)
    }
})

export default router