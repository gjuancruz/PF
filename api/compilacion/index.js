"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const app_1 = __importDefault(require("./src/app"));
const client_1 = require("@prisma/client");
const data_1 = require("./src/routes/data");
const dataCandy_1 = require("./src/routes/dataCandy");
const PORT = process.env.PORT || 3001;
const prisma = new client_1.PrismaClient();
const movielist = [data_1.cars, data_1.spider, data_1.sonic, data_1.iceAge, data_1.thor, data_1.jurassic, data_1.MinionsTheRiseofGru, data_1.lightyear, data_1.topGun, data_1.DrStranger, data_1.Minions, data_1.MinionsHolidaySpecial, data_1.SupermanSpidermanorBatman];
const candylist = [dataCandy_1.comboUno, dataCandy_1.comboFamiliar, dataCandy_1.palomitas, dataCandy_1.gaseosas];
app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    const del1 = yield prisma.comment.deleteMany({});
    // const del2 = await prisma.show.deleteMany({})
    const del2 = yield prisma.movie.deleteMany({});
    // const del = await prisma.seat.deleteMany({})
    // const del3 = await prisma.room.deleteMany({})
    // const del = await prisma..deleteMany({})
    for (let i = 0; i < candylist.length; i++) {
        const movie = yield prisma.menu.upsert({
            where: { name: candylist[i].name },
            update: {},
            create: candylist[i]
        });
    }
    for (let i = 0; i < movielist.length; i++) {
        const movies = yield prisma.movie.upsert({
            where: { Title: movielist[i].Title },
            update: { Title: movielist[i].Title, Plot: movielist[i].Plot, Poster: movielist[i].Poster, Genre: movielist[i].Genre, Actors: movielist[i].Actors, Language: movielist[i].Language, Director: movielist[i].Director, Release: movielist[i].Release, Rated: movielist[i].Rated, Runtime: movielist[i].Runtime, Trailer: movielist[i].Trailer, Type: movielist[i].Type },
            create: movielist[i]
        });
    }
    for (let i = 1; i < 6; i++) {
        const rooms = yield prisma.room.upsert({
            where: { id: i },
            update: {},
            create: { id: i, types: "2D" }
        });
    }
    for (let i = 1; i < 31; i++) {
        const seat = yield prisma.seat.upsert({
            where: { id: i },
            update: {},
            create: { id: i, roomId: 1 }
        });
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
}));
//# sourceMappingURL=index.js.map