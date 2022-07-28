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
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
//http://localhost:3001/admin
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany({
            include: {
                cart: {
                    include: {
                        tickets: true,
                        candy: true
                    }
                }
            }
        });
        res.json(users);
    }
    catch (error) {
        res.status(404).json("No hay usuarios que mostrar");
    }
}));
//http://localhost:3001/admin/searchUser?username=jose
router.get("/searchUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.query;
        const searchName = yield prisma.user.findMany({
            where: {
                username: {
                    contains: `${username}`,
                    mode: 'insensitive'
                }
            }
        });
        res.json(searchName);
    }
    catch (e) {
        res.status(404).json(e.message);
    }
}));
//http://localhost:3001/admin/createUser
router.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, email, role } = req.body;
        let user;
        user = {
            username,
            password,
            email,
            role
        };
        const createUser = yield prisma.user.create({
            data: user
        });
        res.status(201).json(createUser);
    }
    catch (e) {
        res.status(404).json(e.message);
    }
}));
//http://localhost:3001/admin/updateUser
router.put("/updateUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, password, email } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, Number(process.env.SALT_ROUNDS));
        const updateUser = yield prisma.user.updateMany({
            where: {
                id: id
            },
            data: {
                password: `${hashedPassword}`,
            },
        });
        res.status(201).json(updateUser);
    }
    catch (e) {
        res.status(404).json(e.message);
        console.log(e);
    }
}));
//http://localhost:3001/admin/deleteUser
router.delete("/deleteUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // console.log('esto es email',email)
        const deleteUser = yield prisma.user.delete({
            where: { email: `${email}` },
        });
        res.status(201).json(deleteUser);
    }
    catch (e) {
        res.status(404).json(e.message);
    }
}));
exports.default = router;
//# sourceMappingURL=admin.js.map