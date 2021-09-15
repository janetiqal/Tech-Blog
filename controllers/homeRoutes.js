const router= require('express').Router();
const {Comment, Post, User}= require('../models')
const withAuth = require("../utils/authorization")

//TO DO ROUTES FOR HOMEPAGE, error with styling not being inputed...

router.get('/', async (req, res)=>{
try{
    const postData= await Post.findAll({
        attributes: ['id', 'title', 'created_at', 'body'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'body', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    });
        // Serialize data so the template can read it
    const posts = postData.map(post=> post.get({plain:true}));
    res.render('homepage', {
        posts, 
        loggedIn: req.session.loggedIn
    });
}
catch(err){
    res.status(500).json(err)
  }
})
module.exports= router;