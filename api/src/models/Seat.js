const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('seat',{
        id:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        roomid:{
            foreignKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        ticketid:{
            foreignKey:true,
            allowNull:false,
            type:DataTypes.INTEGER
        }
    },{timestamps:false})
}