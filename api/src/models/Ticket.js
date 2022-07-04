const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('ticket',{
        id:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        seatid:{
            foreignKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        roomid:{
            foreignKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        showid:{
            foreignKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        saleid:{
            foreignKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{timestamps:false})
}