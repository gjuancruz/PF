import {Router, Request, Response, NextFunction}  from 'express'
import { PrismaClient } from '@prisma/client'
import Stripe from "stripe";
import { showGenerator } from '../..';

const prisma = new PrismaClient()

const router = Router();

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
// let day = date.getDate();
// let month = date.getMonth()
// let year = date.getFullYear()

//http://localhost:3001/movies/createMovie
router.post("/createMovie", async (req:Request, res:Response) =>{
    try{

        const {Title, Plot, Genre, Actors, Language, Director, Release,
                Poster, Rated, Type, Trailer, Runtime} = req.body
        const movie = await prisma.movie.create({
            data: {
                Title,
                Plot,
                Genre,
                Actors,
                Language,
                Director,
                Release,
                Poster,
                Rated,
                Type,
                Trailer,
                Runtime
        },
    })
    
    res.status(201).json(movie)
    
    }catch(e){
        res.status(404).json("no se pudo crear la movie")
    }

})

//http://localhost:3001/movies/billboard
router.get("/billboard", async (req:Request, res:Response) =>{
    
    try{
        const list = await prisma.movie.findMany({})
        const billboardMovies = list.filter( data => !isPremier(data.Release));
        res.json(billboardMovies);
    
    }catch (error) {
        res.status(404).json("No se obtuvieron datos")
    }
})

router.get("/Premieres", async (_req:Request, res:Response) => {
    try {
        const movies = await prisma.movie.findMany({});
        const filtrado = movies.filter( data => isPremier(data.Release))
        res.json(filtrado)
    } catch (error:any) {
        res.send(error.message)
    }
})

// router.get("/:id", async (req:Request,res:Response) =>{
//http://localhost:3001/movies/search/:id
router.get("/search/:id", async (req:Request,res:Response) =>{
    const {id} = req.params
    try{
        const movie = await prisma.movie.findUnique({
            where:{id:id}
        })
        res.json(movie)

    }catch(e){
        res.status(404).json("no se encontró la movie")
    }
})

http://localhost:3001/movies/:id
router.post("/search/:id", async (req:Request,res:Response) =>{
    const {id} = req.params
    const body = req.body
    try{
        const movie : any = await prisma.movie.findUnique({
            where:{id:id},select:{
                id:false,
                Title: true,
                Plot: true,
                Genre:true,
                Actors: true,
                Language: true,
                Director: true,
                Release: true,
                Poster: true,
                Rated: true,
                Trailer: true,
                Type: true,
                Runtime: true
            }
        })
        console.log(movie)
        const comment : any = await prisma.comment.create({
            data:{
                Text:body.Text,
                // @ts-ignore
                movie:{create:movie}
            }
        })
        res.json(comment)
    }catch(e:any){
        res.status(404).json(e.message)
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

    const {ticket,amount} = req.body
    console.log(ticket)
    const stripe = new Stripe("sk_test_51LKmPfJSzK67Ievut9CIjd8vY41BPktuezRzcVzIERjze7T5LEPDOmZ35auFdbt9mG5zTZFxXbsC0ZXTl96dPw4i00AaZ84pVQ",{apiVersion:"2020-08-27"})
    const data:any={
        username:"Ignacio Brunello",
        password:"1234",
        role:1
    }
    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            payment_method:ticket,
            currency:"USD",
            confirm:true,
        })
        const sale = await prisma.sale.create({data:{
            receipt:ticket,
            user:{create:data}
        }})
        console.log(payment)

        res.send("Payment received")
    }catch(error:any){
        res.send(error.message)
    }
})

router.post("/show",async(req:Request,res:Response)=>{
    const show = req.body
    try{
        const data = await showGenerator(show)
        const shows = await prisma.show.createMany({
            data
        }) 
        res.status(200).send("Lista de shows generada")
    }catch(error:any){
        res.send(error.message)
    }
})

export default router;
