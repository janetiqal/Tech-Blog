const router = require('express').Router()
const { Comment, User, Post } = require('../../models')
const withAuth = require('../../utils/authorization')

//getting all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: {
                model: User,
                attributes: ['username']
            }
        })
        res.status(200).json(commentData)
    }
    catch (err) {
        res.status(400).json(err)
    }
})


// delete a comment if you wrote the comment
router.delete('/:id', withAuth, async (req, res) => {
    //grabbing the comment with its user_id and comparing it the user_id from the req.session
    const thisComment = await Comment.findOne({
        where: {
            id: req.params.id
        }
    });
    console.log("this comment", thisComment)
    console.log(thisComment.user_id)
    console.log("user_id:", req.session.user_id)

    if (req.session.user_id === thisComment.user_id) {
        try {
            const oneComment = await Comment.destroy({
                where: {
                    id: req.params.id
                }
            })
            if (!oneComment) {
                res.status(404).json({ message: "No Comment Found" })
            }
            res.status(200).json(oneComment)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(400).json({msg:"Unable to delete a comment when written by someone else"})
    }
})

//create a comment 
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_body: req.body.comment_body,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        res.status(200).json(newComment)
    }
    catch (err) {
        res.status(400).json(err)
    }
})
//update a comment 
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateComment = await Comment.update({
            body: req.body.body
        },
            {
                where: {
                    id: req.params.id
                },
            }
        )
        if (!updateComment) {
            res.status(404).json({ message: "Can not find comment ID" })
        }
        res.status(200).json(updateComment)
    }
    catch (err) {
        res.status(400).json(err)
    }

})


module.exports = router;