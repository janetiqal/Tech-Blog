const router= require('express').Router();
const {Comment, Post, User}= require('../models')
const withAuth = require("../utils/authorization")



router.get('/', async (req, res)=>{
try{
    const postData= await Post.findAll({
        attributes: ['id', 'title', 'created_at', 'post_body'],
        include: [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'user_id','post_id'],
                //associated the comment w a username
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    });
        // Serialize data so the template can read it
    const posts = postData.map(post=> post.get({plain:true}));
    // console.log("posts,",posts)
    // console.log("comments?",posts[0].comments.comment_body)
    //TO DO: COMMENTS SHOWING UP AS OBJECTS..
 
    res.render('homepage', {
        posts, 
        loggedIn: req.session.loggedIn
    });
}
catch(err){
    res.status(500).json(err)
  }
})

//RENDERS the Login/signup handlebars
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
      res.redirect('/profile');
      return;
    }
    console.log(req.session)
    res.render('login');
  });

//user clicks on a POST on homepage and is taken to a page with only that POST

module.exports= router;