// import { sequelize } from './src/db';
import app from './src/app';
import {PrismaClient} from '@prisma/client'
import {cars, spider, sonic, iceAge, thor, jurassic, MinionsTheRiseofGru, lightyear, topGun, DrStranger, Minions, MinionsHolidaySpecial, SupermanSpidermanorBatman} from "./src/routes/data"

const prisma = new PrismaClient()




app.listen(3001, async () => {

   const del1 = await prisma.comment.deleteMany({})
   const del2 = await prisma.show.deleteMany({})
   const del3 = await prisma.room.deleteMany({})
   const del = await prisma.movie.deleteMany({})

   const movies = await prisma.movie.createMany({   
      data: [cars, spider, sonic, iceAge, thor, jurassic, MinionsTheRiseofGru, lightyear, topGun, DrStranger, Minions, MinionsHolidaySpecial, SupermanSpidermanorBatman]
  })

  const movie : any = await prisma.movie.findFirst({select:{id:true}})

  const movieid : string = movie.id

  const rooms = await prisma.room.createMany({
   data:[{
      id:1
   },{
      id:2
   },
   {
      id:3
   }]
  })

  const room : any= await prisma.room.findFirst({select:{id:true}})

  const roomid : number = room.id

  var data = Array.from({length:100}).map(()=>{
   return{
   schedule:"13:00",
   movieId:movieid,
   roomId:roomid
}})


const showGenerator = (movie:any) => {

   const hour = Math.floor(movie.runtime/60)
   const minute = movie.runtime % 60

   let last = data[data.length-1]
   
   const lasthour = last.schedule.slice(2)
   const lastminute = last.schedule.slice(-2)

   const newhour = lasthour+hour
   const newminute = lastminute + minute

   for(let i=0;i>=420;i+movie.runtime){
      return{schedule:newhour+":"+newminute,movieId:movieid,roomId:roomid}
   }
}
   console.log(data)
  const show = await prisma.show.createMany({
   data
  })

   console.log(`Server ready at: http://localhost:3001`);
})

 