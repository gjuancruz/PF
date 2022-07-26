import {Router, Request, Response, NextFunction}  from 'express'
import { Prisma, PrismaClient} from '@prisma/client'
const showGenerator = async(show:any) => {

    const data = []
    show = {schedule:show.schedule,roomId:show.roomId,movieId:show.movieId,seats:60,day:show.day,type:show.type}
    data.push(show)
    // console.log(data)
    
    const movie = await prisma.movie.findUnique({where:{id:show.movieId}})
    const time = movie?.Runtime
 
    
    const hour = time ? Math.floor(time/60): 13
    const minute = time ? time % 60 : 0
    
    const max = 1440
    const num = Math.floor(time ? max/time : 5)
    
    for(let i = 0;i<num;i++){
       let last = data.reverse().find((e:any)=>e.movieId==show.movieId)
       data.reverse()
       const lasthour = parseInt(last ? last.schedule.slice(0,2):"13")
       const lastminute = parseInt(last ? last.schedule.slice(3,5):"00")
       
       var newhour = lasthour+hour
       var newminute = lastminute + minute + 10 
       if(newminute>=60) {
          newhour+=1
          newminute %= 60
       }
       // console.log(hour)
       
       if(newhour!<24){
       if(newminute<10) {data.push({schedule:newhour+":0"+newminute,movieId:show.movieId,roomId:show.roomId,seats:60,day:show.day,type:show.type}) 
       }
       else {data.push({schedule:newhour+":"+newminute,movieId:show.movieId,roomId:show.roomId,seats:60,day:show.day,type:show.type}) 
       // console.log(data)
       }
    }else{return data}
    }
    return data
 }

const prisma = new PrismaClient()

const router = Router();

router.post("/createRoom", async (req:Request, res:Response) =>{

    const {types} = req.body
    try{
        
        const room = await prisma.room.create({
            data:  types
        })

        res.status(201).json(room)

    }catch(e:any){
        res.json(e.message)
    }
})

router.get("/all",async(req:Request,res:Response)=>{
    try{
        const shows = await prisma.show.findMany({where:{id!:undefined},include:{movie:{select:{Title:true}}}})
        // console.log(shows)
        res.send(shows)
    }catch(error){
        res.send(error)
    }
})

router.get("/one/:id",async(req:Request,res:Response)=>{
    const movieId = req.params.id
    try{
        const shows = await prisma.show.findMany({where:{movieId:movieId}})
        // console.log(shows)
        return res.send(shows)
    }catch(error:any){
        res.send(error.message)
    }
})

router.delete("/one/:id",async(req:Request,res:Response)=>{
    const id = req.params.id
    try{
        const ticket = await prisma.ticket.deleteMany({where:{showId:id}})
        const shows = await prisma.show.delete({where:{id:id}})
        return res.send(shows)
    }catch(error:any){
        res.send(error.message)
    }
})

router.post("/",async(req:Request,res:Response)=>{
    const data : any= req.body.data
    const show = {schedule:data.schedule,roomId:parseInt(data.roomId),movieId:data.movieId,day:data.day,type:data.type} 
    // console.log(data)
    try{
        const data = await showGenerator(show)
        const showid : any = await prisma.show.findMany({where:{id!:undefined},select:{id:true,schedule:true,day:true}})
        if(!showid.length){
            // console.log(showid)
            const shows = await prisma.show.createMany({
                data
            })
            return res.status(200).send("Lista de shows generada")
        }
        for(let i=0;i<data.length;i++){
            const finder = showid.find((e:any)=>e.schedule==data[i].schedule||e.day===data[i].day)
            if(finder==undefined){
                const shows = await prisma.show.create({
                    data:data[i] 
                })
            }
        }
        return res.status(200).send("Lista de shows generada")
    }catch(error:any){
        res.send(error.message)
    }
})

router.get("/day",async(req:Request,res:Response)=>{
    const {day,id} :any= req.query
    try{
        const data = await prisma.show.findMany({where:{day:day,movieId:id}})
        // console.log(data)
        res.status(200).send(data)
    }
    catch(error:any){
        res.send(error.message)
    }
})

export default router