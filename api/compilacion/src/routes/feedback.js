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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feedback = yield prisma.feedback.findMany({
            include: {
                user: true
            }
        });
        res.json(feedback);
    }
    catch (e) {
        res.json(e.message);
    }
}));
router.post("/add/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { Text } = req.body;
    try {
        const feedback = yield prisma.feedback.create({
            data: {
                Text: Text,
                user: {
                    connect: {
                        id: String(id)
                    }
                }
            }
        });
        res.status(201).json("feedback creado exitosamente");
    }
    catch (e) {
        res.json(e.message);
    }
}));
exports.default = router;
//# sourceMappingURL=feedback.js.map