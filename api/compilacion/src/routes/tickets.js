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
                cart: {
                    include: {
                        tickets: true,
                        candy: true
                    }
                }
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
        const userTickets = (_b = user === null || user === void 0 ? void 0 : user.cart) === null || _b === void 0 ? void 0 : _b.tickets.find(item => item.showId === showId);
        let newTickets;
        if (userTickets) {
            newTickets = yield prisma.tickets.update({
                where: {
                    id: userTickets === null || userTickets === void 0 ? void 0 : userTickets.id,
                },
                data: {
                    showId: show.id,
                    userId,
                    seats: userTickets.seats + seats,
                    totalPrice: (userTickets.seats + seats) * 100,
                    // @ts-ignore
                    cartId: cart.id,
                }
            });
        }
        else {
            newTickets = yield prisma.tickets.create({
                data: {
                    showId: show.id,
                    userId,
                    seats,
                    totalPrice: seats * 100,
                    // @ts-ignore
                    cartId: cart.id,
                }
            });
        }
        console.log("newTickets :", newTickets);
        const addNewTickets = yield prisma.cart.update({
            where: { id: (_c = user === null || user === void 0 ? void 0 : user.cart) === null || _c === void 0 ? void 0 : _c.id },
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
        return res.json(addNewTickets);
    }
    catch (e) {
        res.json(e.message);
    }
}));
router.post('/delete', (req, res) => {
    const {} = req.body;
    try {
    }
    catch (error) {
        return res.send(error.message);
    }
});
exports.default = router;
//# sourceMappingURL=tickets.js.map