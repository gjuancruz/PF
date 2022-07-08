// import { sequelize } from './src/db';
import app from './src/app';
import { PrismaClient } from '@prisma/client';
import {cars, spider} from "./src/routes/data"

const prisma = new PrismaClient()
// sequelize
//  .sync({force: true, logging: false})
//  .then(() => {
//     console.log('base de datos conectada! :D');
//     app.listen(3001, function () {
//      console.log('App is listening on port 3001!');
//     });
//  })
//  .catch((err) => console.error(err));

app.listen(3001, async () => {

   const del = await prisma.movie.deleteMany({})

   const movie = await prisma.movie.createMany({
      data: [cars, spider]
  })
   console.log(`Server ready at: http://localhost:3001`);
})

