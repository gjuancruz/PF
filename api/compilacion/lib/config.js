"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    dbUser: process.env.DB_USER || 'postgres',
    dbPassword: process.env.DB_PASSWORD || 'Elias1406',
    dbHost: process.env.DB_HOST || 'localhost',
    dbName: process.env.DB_NAME || 'cinema',
    dbPort: process.env.DB_PORT || '5432',
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.API_PORT || '3001',
    host: process.env.API_host || 'localhost',
    cors: process.env.CORS || 'localhost:3000'
};
exports.default = config;
//# sourceMappingURL=config.js.map