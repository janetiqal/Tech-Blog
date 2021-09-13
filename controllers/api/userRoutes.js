const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req,res)=>{

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