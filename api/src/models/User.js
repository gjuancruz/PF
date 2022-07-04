const {Datatypes} = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('user',{
        id:{
            primaryKey:true,
            type:Datatypes.UUID,
            defaultValue:Datatypes.UUIDV4,
            allowNull:false
        },
        username:{
            type:Datatypes.VARCHAR,
            allowNull:false
        },
        password:{
            type:Datatypes.VARCHAR,
            allowNull:false
        },
        role:{
            type:Datatypes.INTEGER,
            allowNull:false
        }
    },{timestamps:false})
}