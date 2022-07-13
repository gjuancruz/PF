import {Router, Request, Response, NextFunction}  from 'express'
import {PrismaClient} from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

//http://localhost:3001/comments
router.get("/", async (req:Request, res:Response) =>{
    try{
        const movies = await prisma.movie.findMany({
            select:{
                Title: true,
                comments: true,
            }
        })

        res.json(movies)

    }catch(e:any){
        res.json(e.message)
    }
})

//http://localhost:3001/comments/add/:idMovie
router.post("/add/:id", async (req:Request,res:Response) =>{

    const {id} = req.params
    const body = req.body

    try{
        const comment : any = await prisma.comment.create({
            data:{
                Text:body.Text,
                movie:{
                    connect:{
                        id:id
                    }
                }
            }
        })

        res.json(comment)
        
    }catch(e:any){
        res.status(404).json(e.message)
    }
})

router.delete("/delete/:id", async (req:Request, res:Response) =>{

    const {id} = req.params

    try{

        const comment = await prisma.comment.delete({
            where:{id:id}
        })

        res.json("comentario eliminado exitosamente")

    }catch(e:any){
        res.json(e.message)
    }
})

//http://localhost:3001/comments/add/:id
// router.post("/add/:id", async (req:Request,res:Response) =>{

//     const {id} = req.params
//     const body = req.body
//     try{
//         const movie : any = await prisma.movie.findUnique({
//             where:{id:id},
//             select:{
//                 id:false,
//                 Title: true,
//                 Plot: true,
//                 Genre:true,
//                 Actors: true,
//                 Language: true,
//                 Director: true,
//                 Release: true,
//                 Poster: true,
//                 Rated: true,
//                 Trailer: true,
//                 Type: true,
//                 Runtime: true
//             }
//         })
//         const comment : any = await prisma.comment.create({
//             data:{
//                 Text:body.Text,
//                 movie:{create:movie}
//             }
//         })
//         res.json(comment)
//     }catch(e:any){
//         res.status(404).json(e.message)
//     }
// })

export default router