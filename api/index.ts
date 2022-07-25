
require('dotenv').config();
import app from './src/app';
import {PrismaClient} from '@prisma/client'
import {cars, spider, sonic, iceAge, thor, jurassic, MinionsTheRiseofGru, lightyear, topGun, DrStranger, Minions, MinionsHolidaySpecial, SupermanSpidermanorBatman} from "./src/routes/data"
import { comboUno, comboFamiliar, palomitas, gaseosas } from './src/routes/dataCandy';

const PORT = process.env.PORT || 3001;

const prisma = new PrismaClient()

const movielist : any =  [cars, spider, sonic, iceAge, thor, jurassic, MinionsTheRiseofGru, lightyear, topGun, DrStranger, Minions, MinionsHolidaySpecial, SupermanSpidermanorBatman]
const candylist : any = [comboUno, comboFamiliar, palomitas, gaseosas]



app.listen(PORT, async () => {

   // const del1 = await prisma.comment.deleteMany({})
   // const del2 = await prisma.show.deleteMany({})
   // const del = await prisma.seat.deleteMany({})
   // const del3 = await prisma.room.deleteMany({})
   // const del = await prisma..deleteMany({})
   // const carrito = await prisma.menu.deleteMany({})

  /*  const crearCarrito = await prisma.menu.createMany({
      data: candylist
   })
    */
   
   for(let i=0;i<candylist.length;i++){
   const movie = await prisma.menu.upsert({
      where:{name:candylist[i].name},
      update:{name:candylist[i].name,picture:candylist[i].picture,price:candylist[i].price},
      create:candylist[i]
  })
   }

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
