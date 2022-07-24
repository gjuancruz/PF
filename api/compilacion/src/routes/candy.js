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
// http://localhost:3001/candy
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const food = yield prisma.menu.findMany({});
        return res.json(food);
    }
    catch (e) {
        res.json(e.message);
    }
}));
// http://localhost:3001/candy/add
router.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { index, quantity, cartId } = req.body;
        const product = yield prisma.menu.findUnique({
            where: { id: index }
        });
        // console.log('this is product :',product)
        const totalPrice = product.price * quantity;
        const newCandy = yield prisma.candy.create({
            data: {
                name: product.name,
                quantity,
                totalPrice
            }
        });
        // console.log('this is newCandy :',newCandy)
        const cart = yield prisma.cart.findUnique({
            where: { id: cartId }
        });
        // console.log('this is cart :',cart)
        const addNewCandy = yield prisma.cart.update({
            where: { id: cartId },
            data: {
                // @ts-ignore
                orderPrice: cart.orderPrice + newCandy.totalPrice,
                // @ts-ignore
                userId: cart.userId,
                candy: {
                    connect: {
                        id: newCandy.id
                    }
                }
            }
        });
        // console.log('this is addNewCandy :',addNewCandy)
        const newCart = yield prisma.cart.findUnique({
            where: { id: cartId }
        });
        return res.json(newCart);
    }
    catch (e) {
        console.log(e.message);
        res.status(404).json(e.message);
    }
}));
exports.default = router;
//# sourceMappingURL=candy.js.map