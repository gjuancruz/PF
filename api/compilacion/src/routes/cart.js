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
// router.get
router.get('/deleteCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carrito = yield prisma.cart.deleteMany({});
    return res.send(carrito);
}));
//http://localhost:3001/cart --> Obtiene el historial de candys y boletos(tickets) y los manda al front,tiene que recibir el 
//userid desde el front
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: { id: idUser },
            include: {
                cart: {
                    include: {
                        tickets: true,
                        candy: true
                    }
                }
            }
        });
        // @ts-ignore
        res.json(user.cart.candy);
    }
    catch (error) {
        res.status(404).json("No hay usuarios que mostrar");
    }
}));
router.post("/tickets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { idUser } = req.body;
    console.log("Tickets", idUser);
    try {
        const user = yield prisma.user.findUnique({
            where: { id: idUser },
            include: {
                cart: {
                    include: {
                        tickets: true,
                        candy: true
                    }
                }
            }
        });
        // @ts-ignore
        res.json((_a = user.cart) === null || _a === void 0 ? void 0 : _a.tickets);
    }
    catch (error) {
        res.status(404).json("No hay usuarios que mostrar");
    }
}));
router.post('/userCart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.body;
    console.log(idUser);
    try {
        const user = yield prisma.user.findUnique({
            where: { id: idUser },
            include: {
                cart: {
                    include: {
                        tickets: true,
                        candy: true
                    }
                }
            }
        });
        // @ts-ignore
        res.json(user.cart);
    }
    catch (error) {
        console.log(error);
    }
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield prisma.cart.findMany({ include: { candy: true } });
        res.status(200).send(cart);
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.default = router;
//# sourceMappingURL=cart.js.map