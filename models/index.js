const User = require('./User')
const Post = require('./Post')
const Comment = require('./Comment')


//one to many
User.hasMany(Post, {
  foreignKey:'user_id',
  onDelete: 'CASCADE'
})
//Posts can only belong to single user
//many to one
Post.belongsTo(User,{
    foreignKey:'user_id',
})
//one to many
User.hasMany(Comment, {
  foreignKey:'user_id',
  onDelete: 'CASCADE'
})
//many to one
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})
//Comments belong to a single Post, and belongs to a single User
//many to one
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

//one to many
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    // hooks:true
})

module.exports = { User, Post, Comment }