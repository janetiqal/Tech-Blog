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
            attributes:['created_at','title','post_body'],
            order:[],
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
        console.log(posts)
     
        res.render('profile',{
            posts,
            loggedIn: req.session.loggedIn
        })
  }
    catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//create a new post
    //redirects to updated dashboard/aka reloads the page
//edit a post
//delete a post
module.exports= router;