
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Pet = require('./Pet');

// User
User.hasMany(Post, {
  foreignKey: 'user_id'
});

User.hasMany(Pet, {
  foreignKey: 'user_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

// Post
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.belongsTo(Pet, {
  foreignKey: 'pet_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

// Pets
Pet.hasMany(Post, {
  foreignKey: 'pet_id',
});

Pet.belongsTo(User, {
  foreignKey: 'user_id',
});

// Comment
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});


module.exports = { User, Post, Comment, Pet };


