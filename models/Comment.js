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
        lastseen: { 
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
        pinned: {
          type: DataTypes.BOOLEAN,
        },
      },  
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'comment'
    }
  
  );
  
  module.exports = Comment;