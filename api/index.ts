// import { sequelize } from './src/db';
require('dotenv').config();
import app from './src/app';
import {PrismaClient} from '@prisma/client'
import {cars, spider, sonic, iceAge, thor, jurassic, MinionsTheRiseofGru, lightyear, topGun, DrStranger, Minions, MinionsHolidaySpecial, SupermanSpidermanorBatman} from "./src/routes/data"

const prisma = new PrismaClient()

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {

   const del1 = await prisma.comment.deleteMany({})
   const del = await prisma.movie.deleteMany({})

   const movie = await prisma.movie.createMany({   
      data: [cars, spider, sonic, iceAge, thor, jurassic, MinionsTheRiseofGru, lightyear, topGun, DrStranger, Minions, MinionsHolidaySpecial, SupermanSpidermanorBatman]
  })
   console.log(`Server ready at: http://localhost:3001`);
})

 