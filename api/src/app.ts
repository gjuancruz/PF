import express, {Application, Request, Response, NextFunction}  from 'express';

import {PrismaClient, Prisma} from '@prisma/client'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// import config from '../lib/config';
import routes from './routes/index'

const prisma = new PrismaClient();

const app: Application = express();
app.use(express.urlencoded({extended: true, limit: '50mb'})); //middleware
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(
    cors({
    //  origin: config.cors,
     origin: '*',
     credentials: true,
     methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
     allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    })
);

interface error {
    status: number;
    message: string;
}

app.use((err: error, req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

app.use('/api', routes);


//Traer todos los registros
// app.get('/movies', async(req: Request, res: Response) => {
//     const post = await prisma.movie.findMany();
//     res.send(post);
// });

interface movies {
    Title: string;
    Plot: string;
    Genre: string;
    Actors: string;
    Language: string;
    Director: string;
    Release: string;
    Poster: string;
    Rated: string;
    Trailer: string;
    Runtime: number;
}


// crear registro db
app.post('/post', async(req: Request, res: Response) => {
    const { Title, Plot, Genre, Actors, Language, Director, Release, Poster, Rated, Trailer, Runtime }:movies = req.body;
    const result = await prisma.movie.create({
        data: {
            Title, Plot, Genre, Actors, Language, Director, Release, Poster, Rated, Trailer, Runtime
        }
    })
    res.json(result);
});

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

export default app;