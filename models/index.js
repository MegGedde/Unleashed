
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Pet = require('./Pet');

// const Seen = require('./Seen');


User.hasMany(Post, {
    foreignKey: 'user_id'
  });

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Pet, {
    foreignKey: 'user_id',
});

Pet.belongsTo(User, {
    foreignKey: 'user_id',
});

Pet.hasMany(Post, {
  foreignKey: 'pet_id',
});

Post.belongsTo(Pet, {
  foreignKey: 'pet_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Comment, Pet};


