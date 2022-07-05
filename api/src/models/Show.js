const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('show',{
        id:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        movieid:{
            foreignKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        ticketid:{
            foreignKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        roomid:{
            foreignKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{timestamps:false})
}