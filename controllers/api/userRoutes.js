const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//USER data is returned w name, email 
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(userdata => res.status(200).json(userdata))
        .catch(err => {
            res.status(500).json(err)
        })
})
//USER data is returned w name, email and Posts, comments created by this user
router.get('/:id', async (req, res) => {
    try {
        const oneUser = await User.findByPk(req.params.id, {
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['password'],
            },
            include: [{
                model: Post,
                attributes: ['id', 'title', 'created_at', 'body']
            }, {
                model: Comment,
                attributes: ['id', 'body'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            ]
        })
        if (!oneUser) {
            res.status(404).json({ message: "No user found with this ID" })
        }
        res.status(200).json(oneUser)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//creating a new user 
router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const uniqueEmail = await User.findOne({ where: { email: req.body.email } });
        const uniqueUsername = await User.findOne({ where: { username: req.body.username } });
        if (uniqueEmail || uniqueUsername) {
            res.status(408).json({ message: 'The requested Username or Email is already in use. Please enter a different username or email.' });
            return;
          }
          if (req.body.username.length < 4) {
            res.status(410).json({ message: 'Usernames must be longer than 4 characters.'});
            return;
          }
          if(req.body.password.length < 8){
              res.status(409).json({message:'Password Length must be 8 characters or longer'})
              return;
          }
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        },
            {   
                individualHooks: true
            }
        )
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.email = newUser.email;
            req.session.password = newUser.password;
            req.session.loggedIn = true;
            res.status(200).json(newUser)
            console.log("new user posted")
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

//need to check both password and email before allowing sign in
router.post('/login', async (req, res) => {
   try{
       const userLoginData= await User.findOne({
           where:{
               username: req.body.username
           }
       })
       if(!userLoginData){
        res.status(400).json({message:"Incorrect email, or password--try again."})
        return
       }
       const matchPassword= await userLoginData.checkPassword(req.body.password);
       if(!matchPassword){
           //send same message 
           res.status(400).json({message:"Incorrect email, or password--try again."})
           return
       }
       //save session and mark as logged in if password and email match 
       req.session.save(()=>{
           req.session.user_id=userLoginData.id;
           req.session.username=userLoginData.username;
           req.session.loggedIn = true;
           
        res.json({user: userLoginData, message: "You are now logged in!" })
        console.log("user routes: user logged IN")
       });
   } catch(err){
   res.status(400).json(err)
   }
})

router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
          res.status(204).end();
          console.log('user logged out')
        });
      } else {
        res.status(404).end();
      }
});


module.exports = router;