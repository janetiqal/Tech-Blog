const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')
const CommentPost = require('./CommentPost')

//A user can have as many posts and commenty any amount of times
//CREATED the junction table CommentPost to handle this many 
User.belongsToMany(Post, {
    through:{   
    model: CommentPost,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
    },
    as:'posts_by_user'
})

User.belongsToMany(Comment, {
    through:{   
        model: CommentPost,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
        },
        as:'comments_by_user'
})
//Posts can only belong to a single User, but it can have many Comments
//one to one
Post.hasOne(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
//one to many
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})
//Comments belong to a single Post, and belongs to a single User
//one to one
Comment.hasOne(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})
//one to one
Comment.hasOne(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})



module.exports = { User, Post, Comment, CommentPost }