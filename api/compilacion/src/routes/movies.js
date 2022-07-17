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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const middlewares_1 = __importDefault(require("../middlewares/middlewares"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
function isPremier(dateMovie) {
    let date = new Date();
    let [, m, d, y] = String(date).split(' ');
    let ob1 = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12
    };
    const [dayDb, monthDb, yearDb] = dateMovie.split(' ');
    // @ts-ignoreee
    const compararMes = ob1[dayDb] > ob1[m];
    const day = Number(dayDb) > Number(d);
    // @ts-ignore
    const condicionEstrenos = compararMes ? true : (ob1[monthDb] === ob1[m] && day) ? true : false;
    return condicionEstrenos;
}
//http://localhost:3001/movies/createMovie
router.post("/createMovie", [middlewares_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Title, Plot, Genre, Actors, Language, Director, Release, Poster, Rated, Type, Trailer, Runtime } = req.body;
        let newDate;
        // llega esto 2022-07-19
        newDate = Release.split('-'); // [2022, 07, 19]
        newDate.reverse(); // [day, month, year]
        let [day, month, year] = newDate; // [year, month, day]
        switch (month) {
            case '01':
                month = 'Jan';
                break;
            case '02':
                month = 'Feb';
                break;
            case '03':
                month = 'Mar';
                break;
            case '04':
                month = 'Apr';
                break;
            case '05':
                month = 'May';
                break;
            case '06':
                month = 'Jun';
                break;
            case '07':
                month = 'Jul';
                break;
            case '08':
                month = 'Aug';
                break;
            case '09':
                month = 'Sep';
                break;
            case '10':
                month = 'Oct';
                break;
            case '11':
                month = 'Nov';
                break;
            case '12':
                month = 'Dec';
                break;
            default:
                break;
        }
        newDate = `${day} ${month} ${year}`; // '19 July 2022'
        // return newDate;
        const movie = yield prisma.movie.create({
            data: {
                Title,
                Plot,
                Genre,
                Actors,
                Language,
                Director,
                Release: newDate,
                Poster,
                Rated,
                Type,
                Trailer,
                Runtime: parseInt(Runtime)
            },
        });
        res.status(201).json(movie);
    }
    catch (e) {
        console.log(e, 'soy el catch');
        res.status(404).json(e.message);
    }
}));
//http://localhost:3001/movies/billboard
router.get("/billboard", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield prisma.movie.findMany({
            include: {
                comments: true
            }
        });
        const billboardMovies = list.filter(data => !isPremier(data.Release));
        res.json(billboardMovies);
    }
    catch (error) {
        res.status(404).json("No se obtuvieron datos");
    }
}));
//http://localhost:3001/movies/premieres
router.get("/Premieres", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield prisma.movie.findMany({});
        const filtrado = movies.filter(data => isPremier(data.Release));
        res.json(filtrado);
    }
    catch (error) {
        res.send(error.message);
    }
}));
//http://localhost:3001/movies/update/:id
router.put("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movieUpdate = yield prisma.movie.update({
            where: {
                id: id
            },
            data: req.body
        });
        res.json("pelicula actualizada con exito");
    }
    catch (e) {
        res.json("no se pudo actualizar la información");
    }
}));
//http://localhost:3001/movies/delete/:id
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movieDelete = yield prisma.movie.delete({
            where: {
                id: id
            }
        });
        res.json("película eliminada con éxito");
    }
    catch (e) {
        res.json("no se pudo eliminar la pelicula");
    }
}));
//http://localhost:3001/movies/search/:id
router.get("/search/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const movie = yield prisma.movie.findUnique({
            where: { id: id }
        });
        res.json(movie);
    }
    catch (e) {
        res.status(404).json("no se encontró la movie");
    }
}));
//http://localhost:3001/movies/search?name=cars
//http://localhost:3001/movies/search?genre=comedy
//http://localhost:3001/movies/search?type=3d
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, genre, type } = req.query;
    try {
        if (name) {
            const seachByName = yield prisma.movie.findMany({
                where: {
                    Title: {
                        contains: `${name}`,
                        mode: 'insensitive'
                    }
                }
            });
            res.json(seachByName);
        }
        else if (genre) {
            if (genre === 'All')
                return res.json(yield prisma.movie.findMany({}));
            const filterByGenre = yield prisma.movie.findMany({
                where: {
                    Genre: {
                        contains: `${genre}`,
                        mode: 'insensitive'
                    }
                }
            });
            res.json(filterByGenre);
        }
        else if (type) {
            const filterByType = yield prisma.movie.findMany({
                where: {
                    Type: {
                        contains: `${type}`,
                        mode: 'insensitive'
                    }
                }
            });
            res.json(filterByType);
        }
    }
    catch (error) {
        res.status(404).json("no se encontro peli con ese nombre");
    }
}));
exports.default = router;
//# sourceMappingURL=movies.js.map