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
http: //localhost:3001/comments
 router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield prisma.comment.findMany({
            include: {
                user: {
                    select: {
                        username: true
                    }
                },
                movie: {
                    select: {
                        Title: true,
                        Poster: true
                    }
                },
            }
        });
        res.json(movies);
    }
    catch (e) {
        res.json(e.message);
    }
}));
http: //localhost:3001/comments/add/:idMovie
 router.post("/add/:movieId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const { userId } = req.query;
    const body = req.body;
    try {
        const comment = yield prisma.comment.create({
            data: {
                Text: body.Text,
                movie: {
                    connect: {
                        id: movieId
                    }
                },
                user: {
                    connect: {
                        id: String(userId)
                    }
                }
            }
        });
        res.json(comment);
    }
    catch (e) {
        res.status(404).json(e.message);
    }
}));
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const comment = yield prisma.comment.delete({
            where: { id: id }
        });
        res.json(comment);
    }
    catch (e) {
        res.json(e.message);
    }
}));
exports.default = router;
//# sourceMappingURL=comments.js.map