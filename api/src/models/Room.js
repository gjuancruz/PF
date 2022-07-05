const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('room',{
        id:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        seatid:{
            foreignKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{timestamps:false})
}