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
            attributes:['created_at','title','post_body', 'id'],
            // order:[],
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
        console.log(posts.length)
        const postlength= posts.length
        // console.log(posts[0].user.username)
        console.log(req.session.username)
        // const username= posts[0].user.username
        res.render('profile',{
            posts,
            // postlength,
            username: req.session.username,
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
// router.get('/edit/:id', withAuth, async (req,res)=>{
//    try {
//   const editPost= await Post.findOne({
//         where:{
//             id:req.params.id
//         },
//         attributes: [
//             'id',
//             'title',
//             'created_at',
//             'post_body'
//           ],
//         include:[{model: User,
//             attributes:["username"] 
//         }
//     ]
//     })
//     if (!editPost){
//         res.status(404).json({ message: 'No post found with this id.' });
//         return;
//       }
//     const singlePost= editPost.get({plain:true})
//     res.render('edit-post',{
//         singlePost,
//         loggedIn: req.session.loggedIn
//     })
// }
// catch(err){
//     res.status(500).json(err)
//     console.log(err)
// }
// })

//delete a post
module.exports= router;