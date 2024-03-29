require('dotenv').config()
import {Router, Request, Response, NextFunction}  from 'express'
import { PrismaClient } from '@prisma/client'
import Stripe from "stripe";
import verifyToken from '../middlewares/middlewares';

const prisma = new PrismaClient()

const router = Router()

const {STRIPE_KEY} : any = process.env

function isPremier(dateMovie:string):boolean {
    let date: Date = new Date();
    let [,m,d,y]:string[] = String(date).split(' ');
    let ob1 = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12
    };
    const [dayDb, monthDb, yearDb]:string[] = dateMovie.split(' ');
    // @ts-ignoreee
    const compararMes = ob1[dayDb] > ob1[m]
    const day = Number(dayDb) > Number(d)

    // @ts-ignore
    const condicionEstrenos = compararMes ? true : (ob1[monthDb] === ob1[m] && day) ? true : false
    return condicionEstrenos;
}


//http://localhost:3001/movies/createMovie
router.post("/createMovie" , [verifyToken], async (req:Request, res:Response) =>{
    try{

        const {Title, Plot, Genre, Actors, Language, Director, Release,
                Poster, Rated, Type, Trailer, Runtime} = req.body
            let newDate
            // llega esto 2022-07-19
            newDate = Release.split('-'); // [2022, 07, 19]
            newDate.reverse(); // [day, month, year]
            let [day, month, year] = newDate; // [year, month, day]
            switch (month) {
                case '01':
                    month = 'Jan'
                    break;
                case '02':
                    month = 'Feb'
                    break;
                case '03':
                    month = 'Mar'
                    break;
                case '04':
                    month = 'Apr'
                    break;
                case '05':
                    month = 'May'
                    break;
                case '06':
                    month = 'Jun'
                    break;
                case '07':
                    month = 'Jul'
                    break;
                case '08':
                    month = 'Aug'
                    break;
                case '09':
                    month = 'Sep'
                    break;
                case '10':
                    month = 'Oct'
                    break;
                case '11':
                    month = 'Nov'
                    break;
                case '12':
                    month = 'Dec'
                    break;
                default:
                    break;
            }
        newDate = `${day} ${month} ${year}`; // '19 July 2022'
            // return newDate;

        const movie = await prisma.movie.create({
            data: {
                Title,
                Plot,
                Genre,
                Actors,
                Language,
                Director,
                Release: newDate,
                Poster,
                Rated,
                Type,
                Trailer,
                Runtime: parseInt(Runtime)
            },
        })
    
        res.status(201).json(movie)
    
    }catch(e:any){
        console.log(e, 'soy el catch')
        res.status(404).json(e.message)
    }

})

//http://localhost:3001/movies/billboard
router.get("/billboard", async (req:Request, res:Response) =>{
    
    try{
        const list = await prisma.movie.findMany({
            include:{
                comments:{
                    include:{
                        user:{
                            select:{
                                username:true
                            }
                        }
                    }
                }
            }
        })
        const billboardMovies = list.filter( data => !isPremier(data.Release));
        res.json(billboardMovies);
    
    }catch (error) {
        res.status(404).json("No se obtuvieron datos")
    }
})

//http://localhost:3001/movies/premieres
router.get("/Premieres", async (_req:Request, res:Response) => {
    try {
        const movies = await prisma.movie.findMany({});
        const filtrado = movies.filter( data => isPremier(data.Release))
        res.json(filtrado)
    } catch (error:any) {
        res.send(error.message)
    }
})

//http://localhost:3001/movies/update/:id
router.put("/update/:id", async (req:Request, res:Response) =>{
    const {id} = req.params

    let date
            // llega esto 2022-07-19
            date = req.body.Release.split('-'); // [2022, 07, 19]
            date.reverse(); // [day, month, year]
            let [day, month, year] = date; // [year, month, day]
            switch (month) {
                case '01':
                    month = 'Jan'
                    break;
                case '02':
                    month = 'Feb'
                    break;
                case '03':
                    month = 'Mar'
                    break;
                case '04':
                    month = 'Apr'
                    break;
                case '05':
                    month = 'May'
                    break;
                case '06':
                    month = 'Jun'
                    break;
                case '07':
                    month = 'Jul'
                    break;
                case '08':
                    month = 'Aug'
                    break;
                case '09':
                    month = 'Sep'
                    break;
                case '10':
                    month = 'Oct'
                    break;
                case '11':
                    month = 'Nov'
                    break;
                case '12':
                    month = 'Dec'
                    break;
                default:
                    break;
            }
            
            req.body.Release = `${day} ${month} ${year}`; // '19 July 2022'

    try{

        const movieUpdate = await prisma.movie.update({
            where:{
                id: id
            },
            data: req.body
        })

        res.json(movieUpdate)

    }catch(e:any){
        res.json("no se pudo actualizar la información")
    }
})

//http://localhost:3001/movies/delete/:id
router.delete("/delete/:id", async (req:Request, res:Response) =>{
    const {id} = req.params

    try{
        const movieDelete = await prisma.movie.delete({
            where:{
                id: id
            }
        })

        res.json(movieDelete)

    }catch(e){
        res.json("no se pudo eliminar la pelicula")
    }
})

//http://localhost:3001/movies/search/:id
router.get("/search/:id", async (req:Request,res:Response) =>{
    const {id} = req.params
    try{
        const movie = await prisma.movie.findUnique({
            where:{id:id},
            include:{
                comments:{
                    include:{
                        user:{
                            select:{
                                username: true
                            }
                        }
                    }
                }
            }
        })
        console.log(movie)
        res.json(movie)

    }catch(e){
        res.status(404).json("no se encontró la movie")
    }
})

//http://localhost:3001/movies/search?name=cars
//http://localhost:3001/movies/search?genre=comedy
//http://localhost:3001/movies/search?type=3d
router.get('/search', async (req: Request, res:Response) =>{
    const {name, genre, type} = req.query;
    try {
        if(name){
            const seachByName = await prisma.movie.findMany({
                where: {
                    Title: {
                        contains: `${name}`,
                        mode: 'insensitive'
                    }
                }
            })
            res.json(seachByName)
        }
        else if(genre){
            if(genre === 'All') return res.json(await prisma.movie.findMany({}))
            const filterByGenre = await prisma.movie.findMany({
                where: {
                    Genre: {
                        contains: `${genre}`,
                        mode: 'insensitive'
                    }
                }
            })
            res.json(filterByGenre)
        }
        else if(type){
            const filterByType = await prisma.movie.findMany({
                where: {
                    Type: {
                        contains: `${type}`,
                        mode: 'insensitive'
                    }
                }
            })
            res.json(filterByType)
        }
        
    } catch (error) {
        res.status(404).json("no se encontro peli con ese nombre")
    }
})


router.post("/checkout",async(req:Request,res:Response)=>{

    const {show,idUser,ticket} = req.body
    const cart :any = await prisma.cart.findUnique({where:{userId:idUser},include:{candy:true,tickets:true}})
    const stripe = new Stripe(STRIPE_KEY,{apiVersion:"2020-08-27"})
     console.log(cart)
    try{
        const payment = await stripe.paymentIntents.create({
            amount:cart.orderPrice,
            payment_method:ticket,
            currency:"USD",
            confirm:true,
        })
        // console.log(payment)
        const sale = await prisma.sale.create({data:{
            receipt:payment.id,
            // @ts-ignore
            salePrice:cart.orderPrice,
            user:{
                connect:{id:cart.userId}
            }
        }})
        // const sale = await prisma.sale.create({data:{
        //     receipt:ticket,
        //     user:{
        //         connect:{id:cart.userId}
        //     }
        // }})
        const formatedSale = await prisma.sale.update({
            where: {id: sale.id},
            data : {
                // @ts-ignore
                dateFormat : String(sale.createdAt).slice(4,15)
            }
        })
        for(let i=0;i<cart.candy.length;i++){
        const candy = await prisma.candy.update({where:{id:cart.candy[i].id},data:{sale:{connect:{id:sale.id}},cart:{disconnect:true}}})
        }
        for(let i=0;i<cart.tickets.length;i++){
            //@ts-ignore
        const tickets = await prisma.tickets.update({where:{id:cart.tickets[i].id},data:{cart:{disconnect:true}}})
        }
        const room : any= await prisma.show.findUnique({where:{id:show},include:{room:{select:{id:true}}}})
        // console.log(room?.room.id)
        // console.log(seat.id)
        // const candy: any = await prisma.candy.findUnique({where:{id:"fdba5610-1559-4f15-9890-1da57ecb5c60"}})
        
        const newticket = await prisma.ticket.createMany({
            //@ts-ignore
            data:{
                saleId:sale.id,
                showId:show
            }
        })
        const update = await prisma.cart.update({where:{id:cart.id},data:{orderPrice:0}})
        // console.log(update)
        // console.log(newticket)
        res.send("Payment received")
    }catch(error:any){
        res.send(error.message)
    }
})
// http://localhost:3001/movies/getSales
router.get('/getSales', async (req: Request, res:Response) =>{
    try {
        const sales = await prisma.sale.findMany({include:{user:true}})
        return res.status(200).json(sales)
    } catch (error) {
        return res.status(404).json("no se encontraron ventas")
    }
})

export default router
