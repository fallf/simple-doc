const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//Create our User model
class User extends Model {
  //set p method to run on instance data to check password
  checkPassword(loginPw){
      return bcrypt.compareSync(loginPw, this.password);
  }

}

//Define table columns and configuration
User.init(
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
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true
            }  
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
               len: [4]
             }
        },
        role_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },
    {
       hooks:{
           //encrypt password beforeCreate
           async beforeCreate(newUserData){
               newUserData.password = await bcrypt.hash(newUserData.password,10);
               return newUserData;
           },
           //encrypt password before Update
           async beforeUpdate(updatedUser){
               updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
               return updatedUser;

           }
       },
       sequelize,
       timestamps: false,
       freezeTableName: true,
       underscored: true,
       //force model name to lowercase
       modelName: 'user'
    }
);

module.exports = User;

