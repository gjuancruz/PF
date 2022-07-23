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
//http://localhost:3001/cart
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.body;
    try {
        const card = yield prisma.user.findUnique({
            where: { id: idUser },
            include: {
                // cart: true
                cart: {
                    include: {
                        candy: true
                    }
                }
            }
        });
        // @ts-ignore
        res.json(card.cart.candy);
    }
    catch (error) {
        res.status(404).json("No hay usuarios que mostrar");
    }
}));
exports.default = router;
//# sourceMappingURL=cart.js.map