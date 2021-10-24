const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { capitalLetter } = require('../utils/helpers.js');

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
    post_body: {
        type: DataTypes.TEXT,
        allowNull: false,
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
        // added hooks to capitlize every letter in the Title 
        hooks: {
            beforeCreate: async (newPost) => {
                newPost.title = await capitalLetter(newPost.title)
                return
            },
            beforeUpdate: async (updatePost) => {
                updatePost.title = await capitalLetter(updatePost.title)
                return
            }
        },

        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);
module.exports = Post;