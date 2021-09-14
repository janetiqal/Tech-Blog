const router= require('express').Router();
const {Comment, Post, User}= require('../models')
//TO DO ROUTES FOR HOMEPAGE

router.get('/', async (req, res)=>{
try{
    const postData= await Post.findAll({
        // include:[User,{model:Comment, through: CommentPost, as:'comments_by_user'}]
    })
    res.status(200).json(productData)
}
catch(err){
    res.status(500).json(err)
  }
})
module.exports= router;