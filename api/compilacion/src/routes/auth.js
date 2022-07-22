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
require('dotenv').config();
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const middlewares_1 = __importDefault(require("../middlewares/middlewares"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role, username } = req.body;
        //Lets hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, Number(process.env.SALT_ROUNDS));
        const user = yield prisma.user.findUnique({
            // @ts-ignore 
            where: { email: email }
        });
        if (user) {
            return res.status(400).send({ error: 'User already exists' });
        }
        //Adding user to database
        const newUser = yield prisma.user.create({
            // @ts-ignore
            data: { username: username, email: email, password: hashedPassword, role: role }
        });
        const newCart = yield prisma.cart.create({
            data: { userId: newUser.id }
        });
        console.log(newUser);
        return res.status(201).json({ ok: 'Usuario creado !' });
    }
    catch (error) {
        console.log(error);
        return res.status(404).send({ error: 'Error al crear el usuario' });
    }
}));
// Ruta Login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ error: 'Por favor ingresa mail y contraseña válidos' });
        }
        ;
        //Second we fidn out if that email exists in our database.
        const user = yield prisma.user.findUnique({
            // @ts-ignore
            where: { email: email }
        });
        if (!user) {
            return res.status(400).send({ error: 'El usuario no existe, intente nuevamente' });
        }
        //Comparando Password
        const comparePassword = yield bcrypt_1.default.compare(password, user.password);
        // console.log(comparePassword)
        if (!comparePassword) {
            return res.status(403).json({ error: 'Contraseña o Usuario Incorrecto' });
        }
        //Generando Token
        const token = jsonwebtoken_1.default.sign({ user_id: user.id }, process.env.JWT_SECRET || '');
        return res.status(200).json({ token: token });
    }
    catch (error) {
        console.log(error);
        return res.status(400).send('Error al iniciar sesión');
    }
}));
router.get('/acceder', [middlewares_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //verifica si el componente createMovies debe ser renderizado...
    try {
        res.send({
            permitir: true
        });
    }
    catch (error) {
        res.status(403).send({
            permitir: false
        });
    }
}));
router.get('/verify', [middlewares_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({
            check: true
        });
    }
    catch (error) {
        res.json({
            check: false
        });
    }
}));
// router.get('/verifyrole', async (req:Request, res:Response) => {
//     const headerToken:any = req.headers.authorization;
//     const token = headerToken.split(' ')[1];
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
//         console.log(decoded)
//         //@ts-ignore
//         req.user_id = decoded.user_id
//         const user = await prisma.user.findUnique({
//             where: {
//             //@ts-ignore
//               id: decoded.user_id,
//             },
//           })
//             //@ts-ignore
//             if(user.role === 'admin') return 'admin'
//             //@ts-ignore
//           if(user.role === 'user') return 'user'
//           else{
//             return false
//           }
// } catch (error) {
//     console.log(error)
// }
// })
router.get('/verifyrole', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headerToken = req.headers.authorization;
        const token = headerToken.split(' ')[1];
        console.log(token);
        // console.log(req)
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        console.log('soy decoded', decoded);
        // @ts-ignore
        req.user_id = decoded.user_id;
        //@ts-ignore
        console.log(decoded.user_id);
        const user = yield prisma.user.findUnique({
            where: {
                //@ts-ignore
                id: decoded.user_id,
            },
        });
        //@ts-ignore
        if (user.role === 'admin')
            return res.json({ "role": 'admin', "id": req.user_id });
        //@ts-ignore
        if (user.role === 'user')
            return res.json({ "role": 'user', "id": req.user_id });
        //@ts-ignore
        if (user.role !== 'admin' && user.role !== 'user')
            return res.json({ "role": 'guest' });
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({ error: 'Invalid token' });
    }
}));
exports.default = router;
//# sourceMappingURL=auth.js.map