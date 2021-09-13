const { Model, DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/connection.js');

class Post extends Model { }

Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    //title of post
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    },
    //content of post
    body: {
        type: DataTypes.STRING,
        allowNull: false,
        //validation
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
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