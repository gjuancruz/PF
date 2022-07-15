// import { sequelize } from './src/db';
import app from './src/app';
import {PrismaClient} from '@prisma/client'
import {cars, spider, sonic, iceAge, thor, jurassic, MinionsTheRiseofGru, lightyear, topGun, DrStranger, Minions, MinionsHolidaySpecial, SupermanSpidermanorBatman} from "./src/routes/data"

const prisma = new PrismaClient()

const movielist : any =  [cars, spider, sonic, iceAge, thor, jurassic, MinionsTheRiseofGru, lightyear, topGun, DrStranger, Minions, MinionsHolidaySpecial, SupermanSpidermanorBatman]

export const showGenerator = async(show:any) => {

   const data = []

   data.push(show)
   console.log(data)
   
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
      
      if(newhour!<24){
      if(newminute<10) {data.push({schedule:newhour+":0"+newminute,movieId:show.movieId,roomId:show.roomId}) 
      }
      else {data.push({schedule:newhour+":"+newminute,movieId:show.movieId,roomId:show.roomId}) 
      }
   }else{return data}
   }
   return data
}

app.listen(3001, async () => {

   // const del1 = await prisma.comment.deleteMany({})
   // const del2 = await prisma.show.deleteMany({})
   const del3 = await prisma.room.deleteMany({})
   // const del = await prisma.movie.deleteMany({})

   for(let i = 0;i<movielist.length;i++){
   const movies = await prisma.movie.upsert({   
      where:{Title:movielist[i].Title},
      update:{},
      create:movielist[i]
  })}
  const rooms = await prisma.room.createMany({
   data:[{
      id:1
   },{
      id:2
   },
   {
      id:3
   },{
      id:4
   },{
      id:5
   }]
  })
  
//   const movie : any = await prisma.movie.findMany({where:{id!:undefined}})

//   const index : any= movie.map((e:any)=>{
//    return{
//       id:movie.indexOf(e)
//    }
//   })

//   const room : any= await prisma.room.findMany({where:{id!:undefined},select:{id:true}})

//   var data = room.map((e:any)=>{
//    return{
//    schedule:"13:00",
//    movieId:movie[room.indexOf(e)].id,
//    roomId:e.id
// }})
   console.log(`Server ready at: http://localhost:3001`);
})
