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
      species: {
        type: DataTypes.STRING,
        allowNull: false,
        //add list of choices instead of open string
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false,
        //add list of choices instead of open string
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
      //figure out how to add photo
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
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'pet'
    }
  );
  
  module.exports = Pet;