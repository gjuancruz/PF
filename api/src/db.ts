import {Sequelize} from 'sequelize-typescript';
// import { DataTypes } from 'sequelize';
// import fs from 'fs';
// import path from 'path'
import { Movie } from './models/Movie'
import { Room } from './models/Room'
import { Sale } from './models/Sale'
import { Seat } from './models/Seat'
import { Show } from './models/Show'
import { Ticket } from './models/Ticket'
import { User } from './models/User'
import { Comment } from './models/comment';

import config from '../lib/config';
// import { DataTypes } from 'sequelize/types';
config;
export const sequelize = new Sequelize({
 dialect: 'postgres',
 database: config.dbName,
 password: config.dbPassword,
 username: config.dbUser,
 storage: ':memory:',
 models: [__dirname + '/models'],
});

sequelize.addModels([Movie]);
sequelize.addModels([Room]);
sequelize.addModels([Sale]);
sequelize.addModels([Seat]);
sequelize.addModels([Show]);
sequelize.addModels([Ticket]);
sequelize.addModels([User]);
sequelize.addModels([Comment]);

Room.hasMany(Seat)
Seat.hasOne(Room)
//-----------------------------------------------------------------------------------------------------------------//
Seat.hasOne(Ticket)
Ticket.hasOne(Seat)
//-----------------------------------------------------------------------------------------------------------------//
Room.hasMany(Ticket)
Ticket.hasOne(Room)
//-----------------------------------------------------------------------------------------------------------------//
Sale.hasMany(Ticket)
Ticket.hasOne(Sale)
//-----------------------------------------------------------------------------------------------------------------//
Sale.hasOne(User)
User.hasMany(Sale)
//-----------------------------------------------------------------------------------------------------------------//
Show.hasOne(Room)
Room.hasMany(Show)
//-----------------------------------------------------------------------------------------------------------------//
Show.hasOne(Movie)
Movie.hasMany(Show)
//-----------------------------------------------------------------------------------------------------------------//
Ticket.hasOne(Show)
Show.hasMany(Ticket)
//-----------------------------------------------------------------------------------------------------------------//
Comment.hasOne(Movie)
Movie.hasMany(Comment)
//-----------------------------------------------------------------------------------------------------------------//
Comment.hasOne(User)
User.hasMany(Comment)

// const basename = path.basename(__filename);

// const modelDefiners:any = [];

// // Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
// fs.readdirSync(path.join(__dirname, '/models'))
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     modelDefiners.push(require(path.join(__dirname, '/models', file)));
//   });

// // Injectamos la conexion (sequelize) a todos los modelos
// modelDefiners.forEach(model => model(sequelize));
// // Capitalizamos los nombres de los modelos ie: product => Product
// let entries = Object.entries(sequelize.models);
// let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
// sequelize.models = Object.fromEntries(capsEntries);