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
router.delete('/:id', async (req,res)=>{
      //checking the session to see if the user is idle, if so theyll be prompted to sign in again before writing a comment
    if(req.session){
    try{
        const oneComment= await Comment.destroy({
            where:{
                id: req.params.id
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
}
})

//create a comment 
router.post('/', withAuth, async (req,res)=>{
   //checking the session to see if the user is idle, if so theyll be prompted to sign in again before writing a comment
    if(req.session) {
    try{
        const newComment = await Comment.create({
            body: req.body.body,
            post_id: req.body.post_id,
            user_id:req.body.user_id
            //should add a hook to the model to trim the input
        })
        res.status(200).json(newComment)
    }
    catch(err){
        res.status(400).json(err)
    }
}
})
//update a comment 
// router.put('/:id', withAuth, async (req,res)=>{
//   //checking the session to see if the user is idle, if so theyll be prompted to sign in again before writing a comment
//   if(req.session){
//       try{
//           const updateComment= await Comment.update({
             
//             where:{
//                   id: req.params.id
//               }
//           })
//       }
  
//   catch(err){
//     res.status(400).json(err)
//     }
//   }
// })


module.exports= router;