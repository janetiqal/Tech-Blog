const router= require('express').Router()
const { Comment, User, Post }= require('../../models')
const withAuth= require('../../utils/authorization')

//getting all comments
router.get('/',async (req,res)=>{
    try{
        const commentData= await Comment.findAll({
            include:{
                model:User,
                attributes:['username']
            }
        })
        res.status(200).json(commentData)
    } 
    catch(err){
        res.status(400).json(err)
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const oneComment= await Comment.findOne({
            where:{
                id: req.params.id
            },
            include:{
                model:User,
                attributes:['username']
            }
        }) 
        if(!oneComment){
            res.status(404).json({message:"No Comment Found"})
        }
        res.status(200).json(oneComment)
    }
    catch(err){
        res.status(400).json(err)
    }
})

// delete a comment if youre a user
router.delete('/:id', withAuth, async (req,res)=>{
    console.log(req.session.user_id)
    console.log(Comment.user_id)
    try{
        // if(req.session.user_id === Comment.user_id){
        const oneComment= await Comment.destroy({
            include:[user_id],
            where:{
                id: req.params.id
            }
        }) 
        if(!oneComment){
            res.status(404).json({message:"No Comment Found"})
        }
        res.status(200).json(oneComment)
    }
// }
    catch(err){
        res.status(400).json(err)
    }
})

//create a comment 
router.post('/', withAuth, async (req,res)=>{
    try{
        const newComment = await Comment.create({
            comment_body: req.body.comment_body,
            post_id: req.body.post_id,
            user_id:req.session.user_id
        })        
        res.status(200).json(newComment)
    }
    catch(err){
        res.status(400).json(err)
    }
})
//update a comment 
router.put('/:id', withAuth, async (req,res)=>{
    try{
        const updateComment= await Comment.update({
            body: req.body.body
        },
        {
            where:{
                id: req.params.id
            },
        }
        )
        if(!updateComment){
            res.status(404).json({message:"Can not find comment ID"})
        }
        res.status(200).json(updateComment)
    }
    catch(err){
        res.status(400).json(err)
    }
  
})


module.exports= router;