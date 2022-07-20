
require('dotenv').config();
import app from './src/app';
import {PrismaClient} from '@prisma/client'
import {cars, spider, sonic, iceAge, thor, jurassic, MinionsTheRiseofGru, lightyear, topGun, DrStranger, Minions, MinionsHolidaySpecial, SupermanSpidermanorBatman} from "./src/routes/data"

const PORT = process.env.PORT || 3001;

const prisma = new PrismaClient()

const movielist : any =  [cars, spider, sonic, iceAge, thor, jurassic, MinionsTheRiseofGru, lightyear, topGun, DrStranger, Minions, MinionsHolidaySpecial, SupermanSpidermanorBatman]

export const showGenerator = async(show:any) => {

   const data = []
   show = {schedule:show.schedule,roomId:show.roomId,movieId:show.movieId,seats:60}
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
      // console.log(hour)
      
      if(newhour!<24){
      if(newminute<10) {data.push({schedule:newhour+":0"+newminute,movieId:show.movieId,roomId:show.roomId,seats:60}) 
      }
      else {data.push({schedule:newhour+":"+newminute,movieId:show.movieId,roomId:show.roomId,seats:60}) 
      // console.log(data)
      }
   }else{return data}
   }
   return data
}

app.listen(PORT, async () => {

   // const del1 = await prisma.comment.deleteMany({})
   // const del2 = await prisma.show.deleteMany({})
   // const del = await prisma.seat.deleteMany({})
   // const del3 = await prisma.room.deleteMany({})

   for(let i = 0;i<movielist.length;i++){
   const movies = await prisma.movie.upsert({   
      where:{Title:movielist[i].Title},
      update:{Title:movielist[i].Title,Plot:movielist[i].Plot,Poster:movielist[i].Poster,Genre:movielist[i].Genre,Actors:movielist[i].Actors,Language:movielist[i].Language,Director:movielist[i].Director,Release:movielist[i].Release,Rated:movielist[i].Rated,Runtime:movielist[i].Runtime,Trailer:movielist[i].Trailer,Type:movielist[i].Type},
      create:movielist[i]
  })}
  for(let i = 1;i<6;i++){
  const rooms = await prisma.room.upsert({
   where:{id:i},
   update:{},
   create:{id:i,types:"2D"}
  })}
  for(let i = 1;i<31;i++){
   const seat = await prisma.seat.upsert({
      where:{id:i},
      update:{},
      create:{id:i,roomId:1}
   })
  }
//   const movie : any = await prisma.movie.findMany({where:{id!:undefined}})

//   const room : any= await prisma.room.findMany({where:{id!:undefined},select:{id:true}})

//   var data = await room.map((e:any)=>{
//    return{
//    schedule:"13:00",
//    movieId:movie[room.indexOf(e)].id,
//    roomId:e.id
// }})
// for(let i = 0;i<data.length;i++){
// const show = await prisma.show.upsert({
//    where:{roomId:data[i].roomId},
//    update:{},
//    create:{schedule:data[i].schedule,movieId:data[i].movieId,roomId:data[i].roomId}
// })
// }
   console.log(`Server ready at: http://localhost:3001`);
})
