const sequelize= require("../config/connection")
const {User, Post, Comment}= require('../models')

//getting all the seeded data 
const userData=require('./userData.json')
const postData=require('./postData.json')
const commentData=require('./commentData.json')

//seeding data all at once
const seedDatabase = async ()=>{
    await sequelize.sync({force: true});

    const users = await User.bulkCreate(userData,{
        individualHooks: true,
        returning:true,
        plain: true
    })

    const posts = await Post.bulkCreate(postData,{
        individualHooks: true,
        returning:true,
        plain: true
    })
    const comments = await Comment.bulkCreate(commentData,{
        returning:true,
        plain: true
    })
    process.exit(0);
};

seedDatabase();
