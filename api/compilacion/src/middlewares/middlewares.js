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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headerToken = req.headers.authorization;
        if (!headerToken) {
            return res.status(401).send({ error: 'No token provided' });
        }
        const token = headerToken.split(' ')[1];
        // console.log(token);
        // console.log(req)
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
            // @ts ignore
            // req.user_id = decoded.user_id;
            // console.log(decoded)
            // return true;
            next();
        }
        catch (error) {
            console.log(error);
            return res.status(401).send({ error: 'Invalid token' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({ error: 'Invalid token' });
    }
});
exports.default = verifyToken;
//# sourceMappingURL=middlewares.js.map