const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Create our User model
class Role extends Model {}

//Define table columns and configuration
Role.init(
    {
        //Define columns and configurations
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },
    {
       sequelize,
       timestamps: false,
       freezeTableName: true,
       underscored: true,
       //force model name to lowercase
       modelName: 'role'
    }
);

module.exports = Role;