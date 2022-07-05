const {DataTypes} = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('sale',{
        id:{
            primaryKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        ticketid:{
            foreignKey:true,
            type:DataTypes.INTEGER,
            allowNull:false
        },
        userid:{
            foreignKey:true,
            type:DataTypes.UUID,
            allowNull:false
        }
    },{timestamps:false})
}