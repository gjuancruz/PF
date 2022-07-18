import {Router, Request, Response, NextFunction}  from 'express'
import {PrismaClient} from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

//http://localhost:3001/comments
// router.get("/", async (req:Request, res:Response) =>{
//     try{
//         const movies = await prisma.comment.findMany({
//             include:{
//                   user: {
//                     select:{
//                         username: true
//                     }
//                   },
//                   movie:{
//                     select:{
//                         Title: true,
//                         Poster: true
//                     }
//                   },
//             }    
//         })

//         res.json(movies)

//     }catch(e:any){
//         res.json(e.message)
//     }
// })


//http://localhost:3001/comments/add/:idMovie
// router.post("/add/:movieId", async (req:Request,res:Response) =>{

//     const {movieId} = req.params
//     const {userId} = req.query 
//     const body = req.body

//     try{
//         const comment : any = await prisma.comment.create({
//             data:{
//                 Text:body.Text,
//                 movie:{
//                     connect:{
//                         id:movieId
//                     }
//                 },
//                 user:{
//                     connect:{
//                         id:String(userId)
//                     }
//                 }
//             }
//         })

//         res.json(comment)
        
//     }catch(e:any){
//         res.status(404).json(e.message)
//     }
// })

router.delete("/delete/:id", async (req:Request, res:Response) =>{

    const {id} = req.params

    try{

        const comment = await prisma.comment.delete({
            where:{id:id}
        })

        res.json(comment)

    }catch(e:any){
        res.json(e.message)
    }
})

export default router