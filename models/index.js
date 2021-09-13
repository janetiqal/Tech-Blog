const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')

//A user can have as many posts and commenty any amount of times
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
//Posts can only belong to a single User, but it can have many Comments
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})
//Comments belong to a single Post, and belongs to a single User
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})



module.exports = { User, Post, Comment }