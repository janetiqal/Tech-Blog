const router = require('express').Router()
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/authorization')
//CRUD POST

//GET all users POSTS
//dont need to be signed in, anyone can view posts
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.findAll({
            attributes: ['id', 'title', 'created_at', 'post_body'],
            order: [
                ['created_at', 'DESC']
            ],
            //Incldues the comments made on users post w the username of commenter and the posts this user has made comments on
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
        })
        res.status(200).json(allPosts)
    }
    catch (err) {
        res.status(400).json(err)
    }
})

//dont need to be signed in, anyone can view posts
router.get('/:id', async (req, res) => {
    try {
        const getOnePost = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'created_at', 'post_body'],
            include: [{
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
        })
        if (!getOnePost) {
            res.status(404).json({ message: "Can not find Post with this ID." })
        }
        res.status(200).json(getOnePost)
    }
    catch (err) {
        res.status(400).json(err)
    }
})

//creating a new post when logged in
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            post_body: req.body.post_body,
            user_id: req.session.user_id
        },
            {
                individualHooks: true
            }
        );
        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err)
    }
})
//Update an existing post when logged in 
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(
            {
                title: req.body.title,
                post_body: req.body.post_body
            },
            {
                where: {
                    id: req.params.id
                },
                individualHooks: true
            })
        if (!updatePost) {
            res.status(404).json({ message: "No Post found with that ID" })
            return
        }
        res.status(200).json(updatePost)
    }
    catch (err) {
        res.status(400).json(err)
    }
})

//deleteing a post when logged in
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!deletePost) {
            res.status(404).json({ message: "Unable to delete a post that doesnt exist" })
            return;
        }
        res.status(200).json(deletePost)
    }
    catch (err) {
        res.status(400).json(err)
    }
})
module.exports = router;