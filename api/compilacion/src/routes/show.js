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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const showGenerator = (show) => __awaiter(void 0, void 0, void 0, function* () {
    const data = [];
    show = { schedule: show.schedule, roomId: show.roomId, movieId: show.movieId, seats: 60, day: show.day, type: show.type };
    data.push(show);
    // console.log(data)
    const movie = yield prisma.movie.findUnique({ where: { id: show.movieId } });
    const time = movie === null || movie === void 0 ? void 0 : movie.Runtime;
    const hour = time ? Math.floor(time / 60) : 13;
    const minute = time ? time % 60 : 0;
    const max = 1440;
    const num = Math.floor(time ? max / time : 5);
    for (let i = 0; i < num; i++) {
        let last = data.reverse().find((e) => e.movieId == show.movieId);
        data.reverse();
        const lasthour = parseInt(last ? last.schedule.slice(0, 2) : "13");
        const lastminute = parseInt(last ? last.schedule.slice(3, 5) : "00");
        var newhour = lasthour + hour;
        var newminute = lastminute + minute + 10;
        if (newminute >= 60) {
            newhour += 1;
            newminute %= 60;
        }
        // console.log(hour)
        if (newhour < 24) {
            if (newminute < 10) {
                data.push({ schedule: newhour + ":0" + newminute, movieId: show.movieId, roomId: show.roomId, seats: 60, day: show.day, type: show.type });
            }
            else {
                data.push({ schedule: newhour + ":" + newminute, movieId: show.movieId, roomId: show.roomId, seats: 60, day: show.day, type: show.type });
                // console.log(data)
            }
        }
        else {
            return data;
        }
    }
    return data;
});
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("/createRoom", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { types } = req.body;
    try {
        const room = yield prisma.room.create({
            data: types
        });
        res.status(201).json(room);
    }
    catch (e) {
        res.json(e.message);
    }
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shows = yield prisma.show.findMany({ where: { id: undefined }, include: { movie: { select: { Title: true } } } });
        // console.log(shows)
        res.send(shows);
    }
    catch (error) {
        res.send(error);
    }
}));
router.get("/one/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movieId = req.params.id;
    try {
        const shows = yield prisma.show.findMany({ where: { movieId: movieId } });
        // console.log(shows)
        return res.send(shows);
    }
    catch (error) {
        res.send(error.message);
    }
}));
router.delete("/one/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const ticket = yield prisma.ticket.deleteMany({ where: { showId: id } });
        const shows = yield prisma.show.delete({ where: { id: id } });
        return res.send(shows);
    }
    catch (error) {
        res.send(error.message);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body.data;
    const show = { schedule: data.schedule, roomId: parseInt(data.roomId), movieId: data.movieId, day: data.day, type: data.type };
    try {
        const data = yield showGenerator(show);
        console.log(data);
        const showid = yield prisma.show.findMany({ where: { id: undefined }, select: { id: true, schedule: true, day: true, roomId: true } });
        console.log(showid);
        if (!showid.length) {
            const shows = yield prisma.show.createMany({
                data
            });
            return res.status(200).send("Lista de shows generada");
        }
        for (let i = 0; i < data.length; i++) {
            const finder = showid.find((e) => e.day === data[i].day && e.roomId === data[i].roomId);
            if (finder == undefined) {
                const shows = yield prisma.show.create({
                    data: data[i]
                });
            }
        }
        return res.status(200).send("Lista de shows generada");
    }
    catch (error) {
        res.send(error.message);
    }
}));
router.get("/day", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { day, id } = req.query;
    try {
        const data = yield prisma.show.findMany({ where: { day: day, movieId: id } });
        // console.log(data)
        res.status(200).send(data);
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.default = router;
//# sourceMappingURL=show.js.map