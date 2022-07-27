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
const client_1 = require("@prisma/client");
const express_1 = require("express");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
//http://localhost:3001/sale/all
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sale = yield prisma.sale.findMany({ include: { candy: true } });
        res.status(200).send(sale);
    }
    catch (error) {
        res.send(error.message);
    }
}));
exports.default = router;
//# sourceMappingURL=sale.js.map