const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//USER data is returned w name, email 
router.get('/', (req,res)=>{
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(userdata => res.status(200).json(userdata))
    .catch(err=>{
        res.status(500).json(err)
    })
})
//USER data is returned w name, email and Posts created by this user
router.get('/:id', async (req,res)=>{
   try{
    const oneUser= await User.findByPk(req.params.id,{
        where:{
            id:req.params.id
        },
        attributes: {
            exclude: ['password'],
        },
        include:{
            model: Post,
            attributes: ['title']
        },
    })
    if(!oneUser){
        res.status(404).json({message:"No user found with this ID"})
    }
    res.status(200).json(oneUser)
   }
   catch(err){
       res.status(500).json(err)
   }
})







router.post('/login', async (req,res)=>{
    // TO DO:
    //Write user login post route after creating the USER MODEL 
})

router.post('/logout', async (req,res)=>{
    // TO DO:
    //Write user logout post route after creating the USER MODEL 
})
//create/ aka anything associated w the user

module.exports= router;