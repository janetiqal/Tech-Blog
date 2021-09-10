const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Post extends Model {}

Post.init(
    {
         body:{
            type:DataTypes.STRING,
            allowNull:false,
            //validation
        }
    },
    {   
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
    }
);
module.exports = Post;