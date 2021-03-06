const router = require('express').Router();
const { Comment, Post, User } = require('../models')
const withAuth = require("../utils/authorization")


//HOMEPAGE: user sees all posts
router.get('/', async (req, res) => {
    console.log("the session:", req.session)
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'created_at', 'post_body'],
            include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_body', 'user_id', 'created_at'],
                    //associated the comment w a username
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        // Serialize data so the template can read it
        const posts = postData.map(post => post.get({ plain: true }));
        // console.log("posts,", posts)
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//RENDERS the Login/signup handlebars
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.loggedIn) {
        console.log("the session of loggedIn :", req.session.loggedIn)
        res.redirect('/dashboard');
        return;
    }
    console.log(req.session)
    res.render('login');
});

//user clicks on a POST on homepage and is taken to a page with only that POST and its comments
    //dont have to be logged in
router.get('/post/:id', async (req, res) => {
    console.log(req.session)
    try {
        const singlePost = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'created_at', 'post_body'],
            include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_body', 'user_id', 'created_at'],
                    //associated the comment w a username
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });
        if (!singlePost) {
            return res.status(404).json({ message: "No Post found." })
        }
        
        const post = singlePost.get({ plain: true })
        console.log(post)

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn,
            user: req.session.user_id,
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});
module.exports = router;