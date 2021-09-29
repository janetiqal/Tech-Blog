const router= require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/authorization');

//user logs in, is taken to their dashboard and sees all of their posts.
router.get('/', withAuth, async (req,res)=>{
  try{
        const allUserPosts= await Post.findAll({
            where:{
                user_id: req.session.user_id,
            },
            attributes:['created_at','title','post_body', 'id'],
            // order:[],
            include:[{
                model: Comment,
                attributes:['post_id','user_id','comment_body','created_at','id'],
                include:{
                    model:User,
                    attributes:['username']
                },
            },
                {
                    model: User,
                    attributes:['username']
                }
            ]
        })
        const posts = allUserPosts.map(post => post.get({ plain: true }));
        console.log(posts.length)
        const postlength= posts.length
        console.log(req.session.username)
        res.render('profile',{
            posts,
            postlength,
            username: req.session.username,
            loggedIn: req.session.loggedIn
        })
  }
    catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports= router;