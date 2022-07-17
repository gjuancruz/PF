"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
// import config from '../lib/config';
const index_1 = __importDefault(require("./routes/index"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' })); //middleware
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    //  origin: config.cors,
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
}));
app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});
app.use('/', index_1.default);
// crear registro db
// app.post('/post', async(req: Request, res: Response):any => {
//     const { Title, Plot, Genre, Actors, Language, Director, Release, Poster, Rated, Trailer, Runtime }:movies = req.body;
//     const result = await prisma.movie.create({
//         data: {
//             Title, Plot, Genre
//         }
//     })
//     res.json(result);
// })
//actualizar contenido
// app.put('/post/:id', async(req, res) => {
//     const {id} = req.params;
//     const {title, content} = req.body;
//     const post = await prisma.post.update({
//         where: {id: Number(id)},
//         data: {title, content}
//     })
//     res.send(post);
// });
//Eliminar un registro
// app.delete('/post/:id', async(req, res) => {
//     const { id } = req.params;
//     const post = await prisma.post.delete({
//         where: {id: Number(id)}
//     });
//     res.send('post');
// })
exports.default = app;
//# sourceMappingURL=app.js.map