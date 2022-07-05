require('dotenv').config()
const { Sequelize } = require('sequelize')
const fs = require('fs');
const path = require('path');
const {
    DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;
  
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/cinema`,{logging:false,native:false})

const basename = path.basename(__filename)

const modelDefiners = []

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
  modelDefiners.forEach(model => model(sequelize))

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { User, Movie, Show, Ticket, Seat, Room, Sale} = sequelize.models

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

module.exports={
    ...sequelize.models,
    conn:sequelize
}