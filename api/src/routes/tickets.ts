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
                cart: true
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

        const newTickets = await prisma.tickets.create({
            data:{
                showId: show.id,
                userId,
                seats,
                totalPrice:seats*100,
                // @ts-ignore
            
                // @ts-ignore
                cartId: cart.id,
            }
        })
        const update = await prisma.tickets.update({
            where:{id:newTickets.id},
                // @ts-ignore
            data:{dateFormat: String(newTickets.createdAt).slice(4,15)}
        })
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

router.get('/all',async(req:Request,res:Response)=>{
    try {
        const tickets = await prisma.tickets.findMany({include:{show:true}})
        const data = tickets?.map((e:any)=>{
            return{
                totalPrice:e.totalPrice,
                seats:e.seats,
                movie:e.show.movieId,
                type:e.show.type,
                date:e.dateFormat.slice(0,3)
            }
        })
        const total : any[] = []
        const filter = data.forEach((e:any)=>{
            if(total.find((el:any)=>e.date==el.date)==undefined){
                console.log(e)
                total.push(e)
            }else{
                let index = total.findIndex((el:any)=>e.date==el.date)
                total[index].seats += e.seats
                total[index].totalPrice += e.totalPrice
            }
        })
            res.status(200).send(total)
    } catch (error) {
        res.send(error)
    }
})

router.get('/all/detail',async(req:Request,res:Response)=>{
    const {mes} = req.body;
    console.log(mes)
    try {
        const tickets = await prisma.tickets.findMany({include:{show:true}})
        const data = tickets?.map((e:any)=>{
            return{
                totalPrice:e.totalPrice,
                seats:e.seats,
                movie:e.show.movieId,
                type:e.show.type,
                date:e.dateFormat
            }
        })
       
        const filter = data.filter((e:any)=>e.date.slice(0,3)===mes)
        res.status(200).send(filter)
    } catch (error) {
        res.send(error)
    }
})


export default router;