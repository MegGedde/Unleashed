const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_seen_time: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_seen_street: {
        type: DataTypes.STRING,
        allowNull: true
      },
      last_seen_city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_seen_state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_seen_country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pet_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'pet',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

  module.exports = Post;