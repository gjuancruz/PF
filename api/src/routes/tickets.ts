import {Router, Request, Response, NextFunction}  from 'express'
import {PrismaClient} from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()


// http://localhost:3001/tickets

router.post('/addTickets', async (req:Request, res:Response)=>{
    try {
        const {userId, seats, showId, cartId } = req.body
        console.log("vienen por body", userId, seats, showId, cartId);

        const user = await prisma.user.findUnique({
            where: {id: userId},
            include: {
                cart: {
                    include : {
                        tickets: true,
                        candy: true
                    }
                }
            }
        })

        console.log("info user :", user);
        
        const show: any = await prisma.show.findUnique({
            where:{id:showId}
        })
        console.log("entro a show :",show);
        
        const seatsAvailable = await prisma.show.update({
            where:{id:showId},
            data:{
                seats: show.seats - seats,
            }
        })
        console.log("seats Avaliable entro :", seatsAvailable);

        const cart = await prisma.cart.findUnique({
            where:{id:user?.cart?.id}
        })
        console.log("entro a cart :", cart);

        const userTickets = user?.cart?.tickets.find(item => item.showId === showId);

        let newTickets;
        if(userTickets){
            newTickets = await prisma.tickets.update({
                where: {
                    id: userTickets?.id,
                },
                data: {
                    showId: show.id,
                    userId,
                    seats: userTickets.seats + seats,
                    totalPrice:(userTickets.seats + seats)*100,
                    // @ts-ignore
                    cartId: cart.id,
                }
            })
        } else {
            newTickets = await prisma.tickets.create({
                data:{
                    showId: show.id,
                    userId,
                    seats,
                    totalPrice:seats*100,
                    // @ts-ignore
                    cartId: cart.id,
                }
            })
        }

        console.log("newTickets :", newTickets);

        const addNewTickets = await prisma.cart.update({
            where:{id:user?.cart?.id},
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
        // const userToRender = await prisma.user.findUnique({
        //     where:{id:userId},
        //     include : {
        //         cart:{
        //             select:{
        //                 id:true,
        //                 orderPrice:true,
        //                 userId:true,
        //                 tickets:{
        //                     select:{
        //                         id:true,
        //                         showId:true,
        //                         userId:true,
        //                         seats:true,
        //                         totalPrice:true,
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // })

        return res.json(addNewTickets)
    } catch (e:any) {
        res.json(e.message)
    }
})

router.post('/delete', async(req:Request, res:Response) => {
    const {userId, showId} = req.body;
    console.log("userId :",userId, "showId :", showId);
    try {
        const user = await prisma.user.findUnique({
            where: {id: userId},
            include: {
                cart: {
                    include : {
                        tickets: true,
                        candy: true
                    }
                }
            }
        })
        console.log("info user :", user);
        
        // const cart = await prisma.cart.findUnique({ //parece que no es necesario porque ya esta en user
        //     where:{id:user?.cart?.id}
        // })
        // console.log("entro a cart :", cart);

        const userTickets = user?.cart?.tickets.find(item => item.showId === showId);

        const deleteTickets = await prisma.tickets.delete({
            where: {id: userTickets?.id}
        })
        console.log(deleteTickets);
        

        const show: any = await prisma.show.findUnique({
            where:{id:showId}
        })
        console.log("entro a show :",show);

        //actualiza los asientos de la funcion en tal hora
        const seatsAvailable = await prisma.show.update({
            where:{id:showId},
            data:{
                seats: show.seats + userTickets?.seats
            }
        })
        console.log("seats Avaliable entro :", seatsAvailable);

        const userUpdate = await prisma.user.findUnique({
            where: {id: userId},
            include: {
                cart: {
                    include : {
                        tickets: true,
                        candy: true
                    }
                }
            }
        })

        return res.json(userUpdate)

    } catch (error:any) {
        console.log(error.message);
        return res.send(error.message)
    }
})


export default router;