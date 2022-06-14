const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model {}

Pet.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      pet_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pet_age: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      when_encounter: {
        type: DataTypes.STRING,
        allowNull: false
      },
      photo: {
      type: DataTypes.STRING,
      allowNull: false
      },
      unique_features : {
        type: DataTypes.STRING,
        allowNull: true
      },
      // I will uncomment once USER is all ready to go
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
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'pet'
    }
  );
  
  module.exports = Pet;