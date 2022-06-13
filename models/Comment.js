const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
      user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'user',
            key: 'id'
          }
        },
        post_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'post',
            key: 'id'
          }
        },
        last_seen: { 
          type: DataTypes.STRING, 
          allowNull: false,
        },
        user: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        comment: {
          type: DataTypes.STRING,
        },
        // not sure if the pinned is a needed feature?
     //   pinned: {
      //    type: DataTypes.BOOLEAN,
     //   },
      },  
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment'
    }
  
  );
  
  module.exports = Comment;