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
// import { sequelize } from './src/db';
require('dotenv').config();
const app_1 = __importDefault(require("./src/app"));
const client_1 = require("@prisma/client");
const data_1 = require("./src/routes/data");
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 3001;
app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    const del1 = yield prisma.comment.deleteMany({});
    const del = yield prisma.movie.deleteMany({});
    const movie = yield prisma.movie.createMany({
        data: [data_1.cars, data_1.spider, data_1.sonic, data_1.iceAge, data_1.thor, data_1.jurassic, data_1.MinionsTheRiseofGru, data_1.lightyear, data_1.topGun, data_1.DrStranger, data_1.Minions, data_1.MinionsHolidaySpecial, data_1.SupermanSpidermanorBatman]
    });
    console.log(`Server ready at: http://localhost:3001`);
}));
//# sourceMappingURL=index.js.map