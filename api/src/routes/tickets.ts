import {Router, Request, Response, NextFunction}  from 'express'
import {PrismaClient} from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()


// http://localhost:3001/tickets

router.post('/addTickets', async (req:Request, res:Response)=>{
    try {
        const {userId, seats, showId, cartId } = req.body
        const show: any = await prisma.show.findUnique({
            where:{id:showId}
        })
        const seatsAvailable = await prisma.show.update({
            where:{id:showId},
            data:{
                seats: show.seats - seats,
            }
        })

        const cart = await prisma.cart.findUnique({
            where:{id:cartId}
        })
        const newTickets = await prisma.tickets.create({
            data:{
                showId: show.id,
                userId,
                seats,
                totalPrice:seats*100,
                // @ts-ignore
                cartId: cart.id,
            }
        })
        const addNewTickets = await prisma.cart.update({
            where:{id:cartId},
            data:{
                // @ts-ignore
                orderPrice: cart.orderPrice + newTickets.totalPrice,
                // @ts-ignore
                userId: cart.userId,
                // @ts-ignore
                tickets:{
                    connect:{
                        id:newTickets.id
                    }
                }
            }
        })
        const userToRender = await prisma.user.findUnique({
            where:{id:userId},
            include : {
                cart:{
                    select:{
                        id:true,
                        orderPrice:true,
                        userId:true,
                        tickets:{
                            select:{
                                id:true,
                                showId:true,
                                userId:true,
                                seats:true,
                                totalPrice:true,
                            }
                        }
                    }
                }
            }
        })

        return res.json(userToRender)
    } catch (e:any) {
        res.json(e.message)
    }
})



export default router;