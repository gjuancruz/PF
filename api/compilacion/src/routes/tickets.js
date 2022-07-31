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
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// http://localhost:3001/tickets
router.post('/addTickets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { userId, seats, showId, cartId } = req.body;
        console.log("vienen por body", userId, seats, showId, cartId);
        const user = yield prisma.user.findUnique({
            where: { id: userId },
            include: {
                cart: true
            }
        });
        console.log("info user :", user);
        const show = yield prisma.show.findUnique({
            where: { id: showId }
        });
        console.log("entro a show :", show);
        const seatsAvailable = yield prisma.show.update({
            where: { id: showId },
            data: {
                seats: show.seats - seats,
            }
        });
        console.log("seats Avaliable entro :", seatsAvailable);
        const cart = yield prisma.cart.findUnique({
            where: { id: (_a = user === null || user === void 0 ? void 0 : user.cart) === null || _a === void 0 ? void 0 : _a.id }
        });
        console.log("entro a cart :", cart);
        const newTickets = yield prisma.tickets.create({
            data: {
                showId: show.id,
                userId,
                seats,
                totalPrice: seats * 100,
                // @ts-ignore
                // @ts-ignore
                cartId: cart.id,
            }
        });
        const update = yield prisma.tickets.update({
            where: { id: newTickets.id },
            // @ts-ignore
            data: { dateFormat: String(newTickets.createdAt).slice(4, 15) }
        });
        console.log("newTickets :", newTickets);
        const addNewTickets = yield prisma.cart.update({
            where: { id: (_b = user === null || user === void 0 ? void 0 : user.cart) === null || _b === void 0 ? void 0 : _b.id },
            data: {
                // @ts-ignore
                orderPrice: cart.orderPrice + newTickets.totalPrice,
                // @ts-ignore
                userId: cart.userId,
                // @ts-ignore
                tickets: {
                    connect: {
                        id: newTickets.id
                    }
                }
            }
        });
        const addedTickets = yield prisma.user.findUnique({
            where: { id: userId },
            include: {
                cart: {
                    include: {
                        tickets: true
                    }
                }
            }
        });
        // const userToRender = await prisma.user.findUnique({
        //     where:{id:userId},
        //     include : {
        //         cart:{
        //             select:{
        //                 id:true,
        //                 orderPrice:true,
        //                 userId:true,
        //                 tickets:{
        //                     select:{
        //                         id:true,
        //                         showId:true,
        //                         userId:true,
        //                         seats:true,
        //                         totalPrice:true,
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // })
        return res.json((_c = addedTickets === null || addedTickets === void 0 ? void 0 : addedTickets.cart) === null || _c === void 0 ? void 0 : _c.tickets);
    }
    catch (e) {
        res.json(e.message);
    }
}));
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield prisma.tickets.findMany({ include: { show: true } });
        const data = tickets === null || tickets === void 0 ? void 0 : tickets.map((e) => {
            return {
                totalPrice: e.totalPrice,
                seats: e.seats,
                movie: e.show.movieId,
                type: e.show.type,
                date: e.dateFormat.slice(0, 3)
            };
        });
        const total = [];
        const filter = data.forEach((e) => {
            if (total.find((el) => e.date == el.date) == undefined) {
                console.log(e);
                total.push(e);
            }
            else {
                let index = total.findIndex((el) => e.date == el.date);
                total[index].seats += e.seats;
                total[index].totalPrice += e.totalPrice;
            }
        });
        res.status(200).send(total);
    }
    catch (error) {
        res.send(error);
    }
}));
router.get('/all/detail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mes } = req.query;
    console.log(mes);
    try {
        const tickets = yield prisma.tickets.findMany({ include: { show: true } });
        const data = tickets === null || tickets === void 0 ? void 0 : tickets.map((e) => {
            return {
                totalPrice: e.totalPrice,
                seats: e.seats,
                movie: e.show.movieId,
                type: e.show.type,
                date: e.dateFormat
            };
        });
        const filter = data.filter((e) => e.date.slice(0, 3) === mes);
        res.status(200).send(filter);
    }
    catch (error) {
        res.send(error);
    }
}));
exports.default = router;
//# sourceMappingURL=tickets.js.map